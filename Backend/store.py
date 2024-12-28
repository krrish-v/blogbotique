
"""
from llama_index.core import SimpleDirectoryReader
from llama_index.core import VectorStoreIndex, StorageContext
from llama_index.vector_stores.milvus import MilvusVectorStore
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.tools import RetrieverTool, ToolMetadata
from llama_index.core import Settings

class IndexManager:
    def __init__(self, data_file, vector_store_uri="./milvus_demo.db", vector_dim=768):
        self.vector_store_uri = vector_store_uri
        self.vector_dim = vector_dim
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


"""

#bash standalone_embed.sh start

import os
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
import os
import google.generativeai as genai
from langchain_milvus import Milvus
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.docstore.document import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_experimental.text_splitter import SemanticChunker
#from langchain_text_splitters import CharacterTextSplitter


class AI_Engine:
    def __init__(self):
        
        #https://textsynth.com/documentation.html

        #Load ALL LLM models
        self.gemini_model_pro = genai.GenerativeModel('gemini-pro')
        self.gemini_model_text = genai.GenerativeModel('gemini-1.5-flash') #gemini-1.5-flash

    
    def generate_gemini(self, prompt, model):

        response = model.generate_content(prompt,
        generation_config=genai.types.GenerationConfig(
                                  top_p = 0.6,
                                  top_k = 4,
                                  temperature=0.6)
                                  )
        return response.text


class SemanticChunkingONText:

    def __init__(self):
        self.embed_model = HuggingFaceEmbeddings(model_name="jinaai/jina-embeddings-v2-base-en", model_kwargs={'device': 'cpu'}) #

    def chunk(self, text):

        self.documents =  Document(page_content=text, metadata={"source": "local"})
        
        semantic_chunker = SemanticChunker(self.embed_model, breakpoint_threshold_type="gradient")
        semantic_chunks = semantic_chunker.create_documents([self.documents.page_content])
        
        return semantic_chunks


class Vector_Store:
    
    def __init__(self):

        #Load embeddings model
        self.embedding_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.sematic_chunker = SemanticChunkingONText()
        

    def store_data(self, text: str, URI: str):

        docs = self.sematic_chunker.chunk(text)
        #docs = text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=10).split_text(text)

        Milvus.from_documents(
            docs,
            self.embedding_model,
            connection_args={"uri": URI},
        )
        return True

    def retrive_data(self, query:str, URI:str):
        vector_db = Milvus(
            self.embedding_model,
            connection_args={"uri": URI},
        )
        
        docs = vector_db.similarity_search(query)
        
        context = ""
        for doc in docs[:2]:
           context += doc.page_content + " "
        
        return context


'''
URI = "./DB/milvus_demo.db"

text = """
Work-related stress is the response people may have when presented with work demands and pressures that are not matched to their knowledge and abilities and which challenge their ability to cope. Stress occurs in a wide range of work circumstances but is often made worse when employees feel they have little support from supervisors and colleagues, as well as little control over work processes. There is often confusion between pressure or challenge and stress, and sometimes this is used to excuse bad management practice.
Pressure at the workplace is unavoidable due to the demands of the contemporary work environment. Pressure perceived as acceptable by an individual may even keep workers alert, motivated, able to work and learn, depending on the available resources and personal characteristics. However, when that pressure becomes excessive or otherwise unmanageable it leads to stress. Stress can damage an employees' health and the business performance.
Work-related stress can be caused by poor work organization (the way we design jobs and work systems, and the way we manage them), by poor work design (for example, lack of control over work processes), poor management, unsatisfactory working conditions and lack of support from colleagues and supervisors.
Research findings show that the most stressful type of work is that which values excessive demands and pressures that are not matched to workers’ knowledge and abilities, where there is little opportunity to exercise any choice or control, and where there is little support from others.
Workers are less likely to experience work-related stress when demands and pressures of work are matched to their knowledge and abilities, control can be exercised over their work and the way they do it, support is received from supervisors and colleagues, and participation in decisions that concern their jobs is provided.
"""

svb = Vector_Store()
#svb.store_data(text=text, URI=URI)
#print("\n")
result = svb.retrive_data(query="How to deal with work related stress", URI=URI)
print(result)

#'''
#https://www.analyticsvidhya.com/blog/2023/12/google-gemini-api/
#https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=python
#https://ai.google.dev/gemini-api/tutorials/document_search
