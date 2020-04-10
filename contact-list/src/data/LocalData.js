import { v4 as uuidv4 } from "uuid";

const LocalData = () => {
    let data = [
        {
            // id: uuidv4(),
            // checked: false,
            // fullname: "ZAjflkasdjflksdjfkl dfjdfkjddksj",
            // about: "adkghdkjfghafkjldghkljfdghkjdfaghlkjdaghkjadgafgkljhakjdfghlkjhafldgjhaldkfgjhaj@kdjfghadgkjdfhg.com",
            // image: "",
            // email: "adkghdkjfghafkjldghkljfdghkjdfaghlkjdaghkjadgafgkljhakjdfghlkjhafldgjhaldkfgjhaj@kdjfghadgkjdfhg.com",
            // phone: "+91 8511918322",
            // company: "ZURUTEXH INDIA PVT LTD sdfjhfkjd",
            // address: "KJDSFAHDSKLFJAHDSFKJDSHF DSK JHSDKFJHDSKJFHKJHFKfd",
            id: uuidv4(),
            checked: false,
            fullname: "Admin User",
            about: "I am Admin Of the App",
            image: "",
            email: "admin@gmail.com",
            phone: "1231234567",
            company: "Work at Work",
            address: "Gotham City",
        }, {
            id: uuidv4(),
            checked: false,
            fullname: "Karan Parmar",
            about: "Intern At Zuru Tech India pvt ltd",
            image: "brokenLink.png",
            email: "k123parmar@gmail.com",
            phone: "+91 8511918322",
            company: "ZURU Tech India",
            address: "Jivrajpark, Ahmedabad, Gujarat",
        }, {
            id: uuidv4(),
            checked: false,
            fullname: "Elon Musk",
            about: "I build cool stuff",
            image: "https://shareville-media.s3.amazonaws.com/cache/17/28/17280a8830b41b2d4b8b7d97c1f9a265.jpg",
            email: "musk@tesla.com",
            phone: "124 421 8055",
            company: "Tesla Inc",
            address: "Mars nearby Earth",
        }, {
            id: uuidv4(),
            checked: false,
            fullname: "Jeff Bezos",
            about: "I am that rich guy",
            image: "https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg",
            email: "bezos@amazon.com",
            phone: "",
            company: "Amazon Inc",
            address: "Washington",
        }, {
            id: uuidv4(),
            checked: false,
            fullname: "Vrajpal Jhala",
            about: "Intern At ZURU Tech India pvt ltd",
            image: "",
            email: "vrajpaljhala@gmail.com",
            phone: "+91 1234512345",
            company: "ZURU Tech India",
            address: "Navrangpura, Ahmedabad, Gujarat",
        },
    ];
    return (
        data
    )
}

export default LocalData;