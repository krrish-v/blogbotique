
from llama_index.core import SimpleDirectoryReader
from llama_index.core import VectorStoreIndex, StorageContext
from llama_index.vector_stores.milvus import MilvusVectorStore
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.tools import RetrieverTool, ToolMetadata
from llama_index.core import Settings

class IndexManager:
    def __init__(self, data_file, vector_store_uri="./milvus_demo.db", vector_dim=768):
        self.documents = SimpleDirectoryReader(input_files=[data_file]).load_data()

        self.embedding_model = HuggingFaceEmbedding(model_name="jinaai/jina-embeddings-v2-base-en")
        Settings.embed_model = self.embedding_model
        Settings.llm = None
        Settings.chunk_size = 512
        Settings.chunk_overlap = 20

        self.vector_store = MilvusVectorStore(uri=vector_store_uri, dim=vector_dim, overwrite=True)
        self.storage_context = StorageContext.from_defaults(vector_store=self.vector_store)
        self.index = VectorStoreIndex.from_documents(self.documents, storage_context=self.storage_context)

        self.milvus_tool = RetrieverTool(
            retriever=self.index.as_retriever(similarity_top_k=3),  # retrieve top_k results
            metadata=ToolMetadata(
                name="CustomRetriever",
                description='Retrieve relevant information from provided documents.'
            ),
        )
        self.query_engine = self.index.as_query_engine()

    def query(self, query_str):
        return self.query_engine.query(query_str)

