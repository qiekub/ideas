# on another CPU machine
# from bert_serving.client import BertClient
# bc = BertClient(ip='127.0.0.1')  # ip address of the GPU machine
# bc.encode(['First do it', 'then do it right', 'then do it better'])


from bert_serving.server.helper import get_args_parser
from bert_serving.server import BertServer
args = get_args_parser().parse_args(['-model_dir', './multi_cased_L-12_H-768_A-12/',
                                     '-port', '5555',
                                     '-port_out', '5556',
                                     '-max_seq_len', 'NONE',
                                     '-mask_cls_sep',
                                     '-cpu'])
server = BertServer(args)
server.start()

LYcTaWoRu4b8bjGh