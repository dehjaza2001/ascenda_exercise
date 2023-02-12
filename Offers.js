
class Offers{
    constructor(apiResponse,checkInDate){
        this.apiResponse = apiResponse
        this.checkInDate = checkInDate
        this.validCategories = [1,2,4]
        this.additionalDays = 5
    }
    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().slice(0,10)
      }
    filterOffers(){
        let offers = this.apiResponse.offers
        // filter valid categories and valid date
        const dueDate = this.addDays(this.checkInDate,this.additionalDays);
        offers = offers.filter(({category,valid_to}) => category in this.validCategories && dueDate <= valid_to)

        // filter min distance merchants for each offer
        offers.forEach(offer => {
            offer.merchants.sort((merchantA,merchantB) => merchantA.distance - merchantB.distance)
            offer.merchants = [offer.merchants[0]]
        })

        //filter to get only 2 closest offers with different category
        offers.sort((offerA,offerB) =>  offerA.merchants.distance - offerB.merchants.distance)
        let filteredOffers = []
        let selectedCategories = []

        for(let i = 0 ; i < offers.length ; i++){
            if(!(offers[i].category in selectedCategories)){
                filteredOffers.push(offers[i])
                selectedCategories.push(offers[i].category)
            }

            if(filteredOffers.length === 2) break;
        }

        return {offers : filteredOffers}
    }
}

module.exports = Offers


