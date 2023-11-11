import moment from "moment";

const formatDateTime = (date, time) => {
    const dateStr = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"); // saat kısmını silelim

    return moment(`${dateStr} ${time}`, "YYYY-MM-DD HH:mm").format("MM/DD/YYYY HH:mm:ss");
}

export default formatDateTime;