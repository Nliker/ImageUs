curl --location --request PUT 'http://host.docker.internal:9200/image_us' \
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

curl --location --request PUT 'http://host.docker.internal:9200/image_us/_mapping' \
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