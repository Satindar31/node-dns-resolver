import { RecordType } from "./types";

const recordValues: { [key in RecordType]: number } = {
  A: 1,
  AAAA: 28,
  CNAME: 5,
  PTR: 12,
  NS: 2,
  MX: 15,
  SOA: 6,
  TXT: 16,
  ANY: 255,
  // Add more mappings as needed
};

const dnsTypeNames: { [key: number]: string } = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  12: "PTR",
  15: "MX",
  16: "TXT",
  28: "AAAA",
  33: "SRV",
  255: "ANY",
  // Add more mappings as needed
};

/**
 * Fetch DNS records for a given domain.
 *
 * @param {Object} params - The parameters for fetching DNS records.
 * @param {string} params.domain - The domain name to fetch records for. Must be a valid FQDN.
 * @param {RecordType | RecordType[]} params.records - The DNS record types to fetch. Can be a single record type or an array of record types.
 *
 * @throws {Error} Throws an error if the domain is not a valid FQDN.
 *
 * @example
 * fetchRecords({ domain: 'example.com', records: 'A' });
 * fetchRecords({ domain: 'example.com', records: ['A', 'MX'] });
 *
 * @note The 'ANY' record type may not always work as expected and is dependent on the DNS server's support.
 */
export async function fetchRecords({
  domain,
  records,
}: {
  domain: string;
  records: RecordType | RecordType[];
}) {
  try {
    console.log(domain, records);
    // Normalize records to always be an array
    const recordsArray = Array.isArray(records) ? records : [records];

    // Map record types to their corresponding values
    const recordsWithValues = recordsArray.map(
      (record) => recordValues[record]
    );

    // Your logic here
    // console.log(`Fetching records for domain: ${domain}`);

    const dnsRecords = await Promise.all(
      recordsWithValues.map(async (value) => {
        // console.log(`Record value: ${value}`);

        const res = await fetch(
          `https://dns.google/resolve?name=${domain}&type=${value}`
        );
        const data: {
          Answer: { type: RecordType; TTL: number; data: string }[];
        } = await res.json();

        if (data.Answer && data.Answer.length > 0) {
          return {
            type: dnsTypeNames[data.Answer[0].type as unknown as number],
            ttl: data.Answer[0].TTL,
            data: data.Answer[0].data,
          };
        } else {
          throw new Error(`No DNS records found for type ${value}`);
        }
      })
    );

    return dnsRecords;
  } catch (error) {
    // Handle the error
    console.error(`Error: ${(error as Error).name}`);
    throw error;
  }
}
