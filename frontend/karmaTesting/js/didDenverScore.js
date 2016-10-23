function didDenverScore(play) {
    switch (play) {
        case "touchdown and field goal":
            return 7;
        case "touchdown and conversion":
            return 8;
        case "touchdown and missed extra point":
            return 6;
        case "field goal":
            return 3;
        case "no score":
            return 0;
        default:
            break;
    }
}