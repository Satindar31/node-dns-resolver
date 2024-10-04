# DNS Resolver
Fetch A, AAAA, CNAME, TXT, MX, NS, SOA, PTR, SRV and more records for a domain name.
## Usage
```ts
const { fetchRecords } = require("node-dns-resolver");

fetchRecords({domain: "google.com", records: "A"}).then((records) => {
  console.log(records);
});
```

To fetch multiple records at once, you can make use of an array,
```ts
const { fetchRecords } = require("node-dns-resolver");

fetchRecords({domain: "google.com", records: ["TXT", "CNAME"]}).then((records) => {
  console.log(records);
});
```

