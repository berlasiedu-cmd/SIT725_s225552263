const expect = require('chai').expect;
const request = require('request');
const math = require('../routes/mathRoutes');

describe('Multiplication Function API', function () {

    // function tests
    it('should multiply two numbers correctly', function() {
        const result = math.multiply(2, 3);
        expect(result).to.equal(6);
    });

    it('should handle zero correctly (edge case)', function() {
        const result = math.multiply(5, 0);
        expect(result).to.equal(0);
    });

});

describe('API Endpoint Tests', function () {

    const baseUrl = "http://localhost:3000/api/multiply";

    // valid case
    it('should return correct result for valid input', function(done) {
        request.get(`${baseUrl}?a=4&b=5`, function(error, response, body) {
            expect(response.statusCode).to.equal(200);

            const result = JSON.parse(body);
            expect(result.result).to.equal(20);

            done();
        });
    });

    // invalid case
    it('should return error for invalid input', function(done) {
        request.get(`${baseUrl}?a=hello&b=5`, function(error, response, body) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

});