import flask
import argparse
from scripts.chatbot import KickBot

app = flask.Flask(__name__)
bot = KickBot()

@app.route('/chat', methods=['POST'])
def chat():
  message = flask.request.json['message']
  return {'response': bot.chatbot_response(message)}

def args_parser():
  parser = argparse.ArgumentParser(description='KickSupport API')
  parser.add_argument('--host', type=str, default='localhost', help='Host of this API')
  parser.add_argument('--port', type=int, default=5000, help='Port of this API')
  
  return parser.parse_args()

if __name__ == '__main__':
  args = args_parser()
  
  app.run(host=args.host, port=args.port)
