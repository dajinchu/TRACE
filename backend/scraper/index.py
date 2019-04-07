from elasticsearch import Elasticsearch
client = Elasticsearch()


with open(os.path.join(sys.argv[1],'courses.csv'), 'r') as infile:
    reader = csv.DictReader(infile)
    next(reader)



