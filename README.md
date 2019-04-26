# Zendesk Search

![demo](demo.gif)

## Setup local dev environment (Mac)

`git clone https://github.com/attitude-lab/zendesk-search.git`

### 1. Get MongoDB running in the background:

Enter the project directory, eg: `~/project/zendesk-search`

Run `docker run -d -p 27017:27017 -v ~/project/zendesk-search/data/db:/data/db mongo`

Database will be created under `~/project/zendesk-search/data/db`

### 2. Install `node (v11.14.0)` and `yarn`

Make sure you can execute `node --version` and `yarn --version`

### 3. Import some test data:

- `Brew install mongodb`
- `mongoimport --db zendesk --collection organization --file data/organizations.json --jsonArray --mode upsert`
- `mongoimport --db zendesk --collection user --file data/users.json --jsonArray --mode upsert`
- `mongoimport --db zendesk --collection ticket --file data/tickets.json --jsonArray --mode upsert`
- Verify data exists in the collections

### 4. Run app:

`yarn && yarn build && node dist/program.js`

## Populate database with fake data for perf testing

Run `./data/generator/mgodatagen -f ./data/generator/config.json`

250,000 users

1,000,000 tickets

50,000 orgnizations

https://github.com/feliixx/mgodatagen

Indexes are defined for some of the search fields in `models`, to create indexes set `autoIndex: true` in `queryExecutor.js`

https://mongoosejs.com/docs/guide.html#indexes

With:
1) one dockerized MongoDB instance, on a single machine
2) and `ticket.status`, fields of joint collections indexed
3) a ticket collection with 1 million records

Performing a search for tickets that has `pending` status returned in 25 seconds.

Sharding will have to be considered as an option to keep search time reasonable.

## Notes:

- Partial search `string/[string]` fields
- Autocomplete for search fields
