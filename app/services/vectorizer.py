import pinecone
from sentence_transformers import SentenceTransformer
import json
import os

# Initialize Pinecone
pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment=os.getenv("PINECONE_ENVIRONMENT"))
index = pinecone.Index("stock-recommendations")

# sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def vectorize(change, feedback, user_preferences):
    pass
    change_str = json.dumps(change)
    pref_str = json.dumps(user_preferences)
    
    combined_str = f"Change: {change_str} Preferences: {pref_str} Feedback: {feedback}"
    vector = model.encode([combined_str])[0].tolist()
    
    vector_id = str(hash(combined_str))
    
    index.upsert(vectors=[(vector_id, vector, {"change": change, "feedback": feedback, "preferences": user_preferences})])

def query_similar_recommendations(current_portfolio, user_preferences, top_k=5):
    query_str = f"Portfolio: {json.dumps(current_portfolio)} Preferences: {json.dumps(user_preferences)}"
    query_vector = model.encode([query_str])[0].tolist()
    results = index.query(vector=query_vector, top_k=top_k, include_metadata=True)
    
    return results