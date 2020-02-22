pragma solidity >=0.5.0;

contract SongRegistry {

    //create struct with, title owner, url and price
    struct Song {

        address payable owner;
        string title;
        string url;
        uint price;
    }

    // create struct array of song
    Song[] public songs;
    
    // create mapping that will map song id to array of addres of owns
    mapping(uint => address[]) public buyers;
    // set varianle uint to initialise ether
    
    

    // function to register song
    // should add song to array of song
    //it should set set owner to be first buyer
    function register(string memory title, string memory url, uint price) public returns(uint) {
        
        // push song to array
        Song memory song = Song(msg.sender, title, url, price);
        songs.push(song);
        buyers[songs.length -1].push(msg.sender);
        return songs.length - 1;
    }
    function numberOfSongs() public view returns(uint) {
        // gives length
        return songs.length;
    }

    function isBuyer(uint songId) public view returns(bool) {
        // loop through address to see if the songid is an owner
        // use storage since buyer is in storage
        address[] storage songBuyers = buyers[songId];
        bool buyer;
        for (uint i = 0; i < songBuyers.length; i++) {
            if (songBuyers[i] == msg.sender) {
                
                buyer = true;
                return buyer;
                break;
            }

        }
        return buyer;
    }

    //function to buy song given song id
    function buy(uint songId) public payable {
        //gets song from array
        Song storage song = songs[songId];
        require(msg.value == song.price, "Value does not match price.");
        buyers[songId].push(msg.sender);
        song.owner.transfer(msg.value);

    }

}