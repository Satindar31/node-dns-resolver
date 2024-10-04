import { fetchRecords } from "../src/fetchRecords";

describe("fetchRecords", () => {
  test("should contain CNAME with correct value", async () => {
    // Test case 1
    const result1 = await fetchRecords({
      domain: "docs.dns-resolver.satindar-is.me",
      records: "CNAME",
    });
    expect(result1[0].data).toContain("cname.vercel-dns.com.");
  });

  test("should contain TXT with correct value", async () => {
    // Test case 2
    const result2 = await fetchRecords({
      domain: "_vercel.satindar-is.me",
      records: "TXT",
    });
    expect(result2[0].data).toContain(
      "vc-domain-verify=docs.dns-resolver.satindar-is.me,98528c853fa03d4019ac"
    );
  });


  test("should throw an error for invalid domain", async () => {
    // Test case 3
    expect(
      fetchRecords({
        domain: "invalid_domain",
        records: "A",
      })
    ).rejects;
  });
});
