/**
 * Created by agk on 28/09/15.
 */

/**
 * Takes degrees and returns radians.
 * @param degrees
 * @returns {number} Radians
 */
function d2r(degrees) {
    return degrees * 0.01745329251; // (Pi / 180)
}


/**
 *
 * @param radians
 * @returns {number} Degrees
 */
function r2d(radians) {
    return radians * 57.2957795147; // (180 / Pi)
}

