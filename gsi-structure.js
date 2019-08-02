module.exports = {
    buildings,
    provider: {
        name,
        appid,
        version,
        timestamp
    },
    map: {
        name,
        matchid,
        game_time,
        clock_time,
        daytime,
        nightstalker_night,
        game_state,
        win_team,
        customgamename,
        ward_purchase_cooldown,
        paused
    },
    player: {
        steamid,
        name,
        activity,
        kills,
        deaths,
        assists,
        last_hits,
        denies,
        kill_streak,
        commands_issued, 
        team_name,
        gold,
        gold_reliable,
        gold_unreliable,
        gold_from_hero_kills,
        gold_from_creep_kills,
        gold_from_income,
        gold_from_shared,
        gpm,
        xpm
    },
    hero: {
        id,
        name
    },
    abilities,
    items,
    draft,
    wearables
};
