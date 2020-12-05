module.exports = async (member, minRole) => {
    return minRole == "0" ? true : member.roles.highest.comparePositionTo(minRole) >= 0
}