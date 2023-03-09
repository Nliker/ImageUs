curl --location --request PUT 'http://elasticsearch:9200/image_us' \
--header 'Content-Type: application/json' \
--data-raw '{
  "settings": {
    "analysis": {
            "analyzer": {
                "my_analyzer": {
                    "tokenizer": "my_tokenizer"
                }
            },
            "tokenizer": {
                "my_tokenizer": {
                    "type": "ngram",
                    "min_gram": 1,
                    "max_gram": 30,
                    "token_chars": [
                        "letter",
                        "digit",
                        "punctuation"
                    ]
                }
            }
        },
        "max_ngram_diff":30
    }
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_mapping' \
--header 'Content-Type: application/json' \
--data-raw '{
    "properties": {
        "email": {
            "type": "text",
            "analyzer": "my_analyzer",
            "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
        },
        "name": {
                    "type": "keyword"
        }
    }
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test1@test.com",
  "id": 1,
  "name":"test1"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/2' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test2@test.com",
  "id": 2,
  "name":"test2"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/3' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test3@test.com",
  "id": 3,
  "name":"test3"
}'