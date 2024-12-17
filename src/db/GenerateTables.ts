import User from "./Models/User";
import Events from "./Models/Events";
import EventType from "./Models/EventType";
import Guest from "./Models/Guests";
import Plan from "./Models/Plans";
import Templates from "./Models/Templates";

const syncDatabase = async () => {
    try {
        await User.sync();
        await Plan.sync();
        await EventType.sync();
        await Templates.sync();
        await Events.sync();
        await Guest.sync();

        console.log("All models synced successfully!");
    } catch (error) {
        console.error("Error syncing database models:", error);
        console.error(JSON.stringify(error, null, 2));
    }
};

syncDatabase();
