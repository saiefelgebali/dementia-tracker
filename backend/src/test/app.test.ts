import { expect } from "chai";

import debug from "debug";

const debugLog = debug("test:app");

describe("Index Test", () => {
	// Test the testing infrastructure
	debugLog("Starting index test");
	it("should always pass", () => {
		expect(true).to.equal(true);
	});
});
