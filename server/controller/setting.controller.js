const {addNavbarItem,getNavbarItem} = require("../services/setting.services");

module.exports = {
    addNewNavbarItem: (req, res) => {
        const body = req.body;
        addNavbarItem(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getsettingAllItem: (req, res) => {
        let key = req.query.key;
        if(process.env.API_KEY != key){
            return res.send(404);
        }else{
            // return res.json({
            //     success: 1,
            //     data: key
            // });
        getNavbarItem((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(results);

            // return res.json({
            //     success: 1,
            //     data: results
            // });
        });

        }
    }
}