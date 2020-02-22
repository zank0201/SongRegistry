const SongRegistry = artifacts.require("./SongRegistry.sol")
contract("SongRegistry", function (accounts) {
    // predefine contract instance
    let SongRegistryInstance

    //before each test create new contranct instance
    beforeEach(async function () {
        SongRegistryInstance = await SongRegistry.new()

    })

    it("should add a song to the registry", async function() {
        // first register song
        await SongRegistryInstance.register("Cool Song", "example.com", 1, {from: accounts[0]})

        // use round brackets for public variables; treat them like functions
        let song = await SongRegistryInstance.songs(0)
        //console.log(typeof {from: accounts[0]})
        assert.equal(song.title, "Cool Song", "Title has not been set correctl")
        assert.equal(song.owner, accounts[0], "Owner is not account0")
        assert.equal(song.url, "example.com", "A url was not made")
        assert.equal(song.price, 1, "The price is not available")
    })

    it("should check a song can be bought", async function() {
        // register a song
        // find songid using length of songs array
       // await SongRegistryInstance.register("Cool Song2", "example.com", 2, {from: accounts[1]})
       await SongRegistryInstance.register("Cool Song", "example.com", 1, {'from': accounts[0]})

       //call buy function
        //songid = Number(songid.words[0])
        
        await SongRegistryInstance.buy(0, {'from': accounts[1], 'value': 1})
        // check buyers map to find if song was bought
        let isBuyer = await SongRegistryInstance.isBuyer(0, {'from': accounts[1]})
        // check if true
        assert(isBuyer, "A song could not be bought")
        

 
    })
    it("should check number of songs increases with new registration", async function() {
    // register new song
        await SongRegistryInstance.register("Cool Song", "example.com", 1, {'from': accounts[0]})

        await SongRegistryInstance.register("Cool Song2", "example.com", 2, {'from': accounts[1]})

        //call number of songs to get length of songs
        let songNumber = await SongRegistryInstance.numberOfSongs()
        console.log(songNumber)
        assert.equal(songNumber.toNumber(), 2, "The number of songs has not increased")

    })

    it("should check that only a true buyer is identifed as such", async function() {

        // buyers will be false since we havent bought anything
        await SongRegistryInstance.register("Cool Song2", "example.com", 2, {'from': accounts[2]})

        await SongRegistryInstance.buy(0, {'from': accounts[1], 'value': 2})

        let buyers = await SongRegistryInstance.isBuyer(0, {"from": accounts[1]}) 
        assert(buyers, "Not a true buyer")
        })
        



    })

