/** Canonical permalinks — used if live fetch fails so cards still link correctly. */

export type XPostSource = { id: string; url: string };

export const englishXSources: XPostSource[] = [
  { id: "1991595932606165143", url: "https://x.com/demishassabis/status/1991595932606165143" },
  { id: "1991536165145702808", url: "https://x.com/rohanpaul_ai/status/1991536165145702808" },
  { id: "1991378471604334604", url: "https://x.com/DrDatta_AIIMS/status/1991378471604334604" },
  { id: "1973373655251038701", url: "https://x.com/DrDatta_AIIMS/status/1973373655251038701" },
  { id: "1991504845015249260", url: "https://x.com/_simonsmith/status/1991504845015249260" },
  { id: "1991886919131939196", url: "https://x.com/HealthcareAIGuy/status/1991886919131939196" },
  { id: "1973727001874956480", url: "https://x.com/rohanpaul_ai/status/1973727001874956480" },
  { id: "1974453196493041825", url: "https://x.com/haider1/status/1974453196493041825" },
  { id: "1993028568205447182", url: "https://x.com/DominikFilkus/status/1993028568205447182" },
];

export const internationalXSources: XPostSource[] = [
  { id: "1974652950770581749", url: "https://x.com/rN1oO71GTPiEMks/status/1974652950770581749" },
  { id: "1991636288492171372", url: "https://x.com/rN1oO71GTPiEMks/status/1991636288492171372" },
  { id: "1991545909424058435", url: "https://x.com/pseudophakic_sh/status/1991545909424058435" },
  { id: "1974594801598418963", url: "https://x.com/kimmonismus/status/1974594801598418963" },
];

/** Reddit short IDs (without subreddit prefix). */
export const redditPostIds: string[] = [
  "1nx7n0m",
  "1nxe8qk",
  "1p36tur",
  "1p20mxw",
  "1nyj7il",
];
