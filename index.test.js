
const Offers = require('./Offers.js')

const mockApiResponse = {
    "offers":[
       {
          "id":1,
          "title":"Offer 1",
          "description":"Offer 1 description",
          "category":1,
          "merchants":[
             {
                "id":1,
                "name":"Offer1 Merchant1",
                "distance":0.5
             }
          ],
          "valid_to":"2020-02-01"
       },
       {
          "id":2,
          "title":"Offer 2",
          "description":"Offer 2 description",
          "category":2,
          "merchants":[
             {
                "id":2,
                "name":"Offer2 Merchant1",
                "distance":1.3
             }
          ],
          "valid_to":"2019-12-01"
       },
       {
          "id":3,
          "title":"Offer 3",
          "description":"Offer 3 description",
          "category":2,
          "merchants":[
             {
                "id":3,
                "name":"Offer3 Merchant1",
                "distance":0.8
             },
             {
                "id":4,
                "name":"Offer3 Merchant2",
                "distance":0.9
             }
          ],
          "valid_to":"2020-01-01"
       },
       {
          "id":4,
          "title":"Offer 4",
          "description":"Offer 4 description",
          "category":3,
          "merchants":[
             {
                "id":5,
                "name":"Offer4 Merchant1",
                "distance":0.3
             }
          ],
          "valid_to":"2020-05-01"
       },
       {
          "id":5,
          "title":"Offer 5",
          "description":"Offer 5 description",
          "category":4,
          "merchants":[
             {
                "id":6,
                "name":"Offer5 Merchant1",
                "distance":1.2
             }
          ],
          "valid_to":"2020-05-01"
       },
       {
          "id":6,
          "title":"Offer 6",
          "description":"Offer 6 description",
          "category":2,
          "merchants":[
             {
                "id":7,
                "name":"Offer6 Merchant1",
                "distance":1.3
             }
          ],
          "valid_to":"2020-05-01"
       }
    ]
 }

describe("filterOffers", () => {
    it("should only return valid date range",() =>{
      const offer = new Offers(mockApiResponse, "2022-01-01")
      const filteredOffers = offer.filterOffers()
      expect(filteredOffers).toEqual({ "offers": [] })
    });
    it("should return two offers with different categories",() =>{
      const offer = new Offers(mockApiResponse, "2019-12-25")
      const filteredOffers = offer.filterOffers().offers
      expect(filteredOffers.length).toBe(2)
      expect(filteredOffers[0].category).not.toBe(filteredOffers[1].category)
    });
    it("should return valid required categories",() =>{
      const offer = new Offers(mockApiResponse, "2019-12-25")
      const filteredOffers = offer.filterOffers().offers
      filteredOffers.forEach((item) =>{
         expect(item.category in offer.validCategories)
      })
    });
    it("should filter the offers correctly", () => {
      const offer = new Offers(mockApiResponse, "2019-12-25")
      const filteredOffers = offer.filterOffers()
      expect(filteredOffers).toEqual({
        "offers": [
          {
            "id": 1,
            "title": "Offer 1",
            "description": "Offer 1 description",
            "category": 1,
            "merchants": [
              {
               "id": 1,
               "name": "Offer1 Merchant1",
               "distance": 0.5
              }
            ],
            "valid_to": "2020-02-01"
          },
          {
            "id": 3,
            "title": "Offer 3",
            "description": "Offer 3 description",
            "category": 2,
            "merchants": [
              {
               "id": 3,
               "name": "Offer3 Merchant1",
               "distance": 0.8
              }
            ],
            "valid_to": "2020-01-01"
          }
        ]
      });
    });
  });