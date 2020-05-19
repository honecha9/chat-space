# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## users_table
|column|Type|opitons|
|------|----|-------|
|nickname|string|null: false||
|e-mail|string|null: false||
|passward|string|null: false||


### association
- has_many :groups thorough: :members
- has_many :messages
- has_many :members

## groups_table
|column|Type|opitons|
|------|----|-------|
|name|string|null: false|

### association
- has_many :users thorough: :members
- has_many :messages
- has_many :members

## members_table
|column|Type|opitons|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### association
- belong_to :group
- belong_to :user

## message_table
|column|Type|opitons|
|------|----|-------|
|text|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|iteger|null: false, foreign_key: true|

### association
- belong_to :user
- belong_to :group

