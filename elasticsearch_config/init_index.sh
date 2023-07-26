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
        },
        "user_type": {
                    "type": "keyword"
        }
    }
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test1@test.com",
  "id": 1,
  "name":"test1",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/2' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test2@test.com",
  "id": 2,
  "name":"test2",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/3' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test3@test.com",
  "id": 3,
  "name":"test3",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/4' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test4@test.com",
  "id": 4,
  "name":"test4",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/5' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test5@test.com",
  "id": 5,
  "name":"test5",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/6' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test6@test.com",
  "id": 6,
  "name":"test6",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/7' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test7@test.com",
  "id": 7,
  "name":"test7",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/8' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test8@test.com",
  "id": 8,
  "name":"test8",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/9' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test9@test.com",
  "id": 9,
  "name":"test9",
  "user_type":"image_us"
}'

curl --location --request PUT 'http://elasticsearch:9200/image_us/_doc/10' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "test10@test.com",
  "id": 10,
  "name":"test10",
  "user_type":"image_us"
}'
