import React, { useState, useEffect } from 'react';
import './App.css';

function BoxGraphic({ data }) {
    return (
        <div>
            <DownloadImage data={data} />
            <div className="BoxGraphic">
                <canvas id="myCanvas" width="1200" height="500"></canvas>
            </div>
            <div id="screenshot">
                <Canvas data={data} />
            </div>
        </div>
    )
};

function Canvas({ data }) {
    const [shouldDraw, setShouldDraw] = useState(true);
    useEffect(() => {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = '#cecece';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //draw left logo container
        ctx.fillStyle = data.additional.home.color;
        ctx.beginPath();
        ctx.moveTo(11, 9);
        ctx.lineTo(113, 9);
        ctx.lineTo(180, 90);
        ctx.lineTo(11, 90);
        ctx.closePath();
        ctx.fill();
        //add logo
        let homeImg = new Image();
        homeImg.src = `images/${data.additional.home.name}.png`;
        homeImg.onload = () => {
            drawImageScaled(homeImg, ctx, 95, 75, 13, 12);
        }

        //draw left team name container
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(126, 9);
        ctx.lineTo(502, 9);
        ctx.lineTo(502, 90);
        ctx.lineTo(192, 90);
        ctx.closePath();
        ctx.fill();
        //add text to left team name
        ctx.font = `normal bold ${fontSizing(data.highLevelStats.homeTeam.info.nickname)} sans-serif`;
        ctx.fillStyle = data.additional.home.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(data.highLevelStats.homeTeam.info.nickname.toUpperCase(), 340, 56);

        //Box that say's Final
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(513, 9);
        ctx.lineTo(686, 9);
        ctx.lineTo(686, 90);
        ctx.lineTo(513, 90);
        ctx.closePath();
        ctx.fill();
        //add FINAL text to left team name
        ctx.font = `normal bold ${finalText(data.highLevelStats.details.status).font} sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(finalText(data.highLevelStats.details.status).text, 600, 56);

        //draw right team name container
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(697, 9);
        ctx.lineTo(1073, 9);
        ctx.lineTo(1007, 90);
        ctx.lineTo(697, 90);
        ctx.closePath();
        ctx.fill();
        //add text to left team name
        ctx.font = `normal bold ${fontSizing(data.highLevelStats.visitingTeam.info.nickname)} sans-serif`;
        ctx.fillStyle = data.additional.away.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(data.highLevelStats.visitingTeam.info.nickname.toUpperCase(), 860, 56);

        //draw left logo container
        ctx.fillStyle = data.additional.away.color;
        ctx.beginPath();
        ctx.moveTo(1088, 9);
        ctx.lineTo(1189, 9);
        ctx.lineTo(1189, 90);
        ctx.lineTo(1022, 90);
        ctx.closePath();
        ctx.fill();
        //add logo
        let awayImg = new Image();
        awayImg.src = `images/${data.additional.away.name}.png`;
        awayImg.onload = () => {
            drawImageScaled(awayImg, ctx, 95, 75, 1090, 12);
        }

        let middleRowLowerYBound = 350;
        let titleLineBreakY = 150;

        //draw left player highlight box
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(11, 100);
        ctx.lineTo(212, 100);
        ctx.lineTo(212, middleRowLowerYBound);
        ctx.lineTo(11, middleRowLowerYBound);
        ctx.closePath();
        ctx.fill();
        //add title
        ctx.font = `normal bold 14pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('POWER PLAY', 111, 130);
        //draw header line (rectangle)
        ctx.fillStyle = '#cecece';
        ctx.beginPath();
        ctx.moveTo(41, titleLineBreakY);
        ctx.lineTo(182, titleLineBreakY);
        ctx.lineTo(182, titleLineBreakY + 3);
        ctx.lineTo(41, titleLineBreakY + 3);
        ctx.closePath();
        ctx.fill();
        //add pp text
        let homePP = data.highLevelStats.homeTeam.stats.powerPlayGoals + '/' + data.highLevelStats.visitingTeam.stats.infractionCount;
        ctx.font = `normal bold 50pt sans-serif`;
        ctx.fillStyle = data.additional.home.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(homePP, 111, 260);

        //draw left shot box
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(226, 100);
        ctx.lineTo(426, 100);
        ctx.lineTo(426, middleRowLowerYBound);
        ctx.lineTo(226, middleRowLowerYBound);
        ctx.closePath();
        ctx.fill();
        //add title
        ctx.font = `normal bold 14pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SHOTS', 326, 130);
        //draw header line (rectangle)
        ctx.fillStyle = '#cecece';
        ctx.beginPath();
        ctx.moveTo(256, titleLineBreakY);
        ctx.lineTo(396, titleLineBreakY);
        ctx.lineTo(396, titleLineBreakY + 3);
        ctx.lineTo(256, titleLineBreakY + 3);
        ctx.closePath();
        ctx.fill();
        //add shots text
        ctx.font = `normal bold 50pt sans-serif`;
        ctx.fillStyle = data.additional.home.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(data.highLevelStats.homeTeam.stats.shots, 326, 260);

        //draw goal rectangle
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(440, 100);
        ctx.lineTo(canvas.width - (426 + 14), 100);
        ctx.lineTo(canvas.width - (426 + 14), middleRowLowerYBound);
        ctx.lineTo(440, middleRowLowerYBound);
        ctx.closePath();
        ctx.fill();
        //add goal image
        let goal = new Image();
        goal.src = `box_graphic_images/hockeyGoal.png`;
        goal.onload = () => {
            drawImageScaled(goal, ctx, 320, 180, 440, titleLineBreakY);

            //add home goals
            ctx.font = `normal bold 72pt sans-serif`;
            ctx.fillStyle = data.additional.home.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(data.highLevelStats.homeTeam.stats.goals, 535, 230);
            //add away goals
            ctx.font = `normal bold 72pt sans-serif`;
            ctx.fillStyle = data.additional.away.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(data.highLevelStats.visitingTeam.stats.goals, canvas.width - (440 + 95), 230);
        }
        //add title
        ctx.font = `normal bold 14pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SCORE', 600, 130);

        //draw right power play box
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(1189, 100);
        ctx.lineTo(988, 100);
        ctx.lineTo(988, middleRowLowerYBound);
        ctx.lineTo(1189, middleRowLowerYBound);
        ctx.closePath();
        ctx.fill();
        //add title
        ctx.font = `normal bold 14pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('POWER PLAY', 1089, 130);
        //draw header line (rectangle)
        ctx.fillStyle = '#cecece';
        ctx.beginPath();
        ctx.moveTo(1159, titleLineBreakY);
        ctx.lineTo(1018, titleLineBreakY);
        ctx.lineTo(1018, titleLineBreakY + 3);
        ctx.lineTo(1159, titleLineBreakY + 3);
        ctx.closePath();
        ctx.fill();
        //add pp text
        let awayPP = data.highLevelStats.visitingTeam.stats.powerPlayGoals + '/' + data.highLevelStats.homeTeam.stats.infractionCount;
        ctx.font = `normal bold 50pt sans-serif`;
        ctx.fillStyle = data.additional.away.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(awayPP, 1089, 260);

        //draw right shot box
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(canvas.width - 226, 100);
        ctx.lineTo(canvas.width - 426, 100);
        ctx.lineTo(canvas.width - 426, middleRowLowerYBound);
        ctx.lineTo(canvas.width - 226, middleRowLowerYBound);
        ctx.closePath();
        ctx.fill();
        //add title
        ctx.font = `normal bold 14pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SHOTS', canvas.width - 326, 130);
        //draw header line (rectangle)
        ctx.fillStyle = '#cecece';
        ctx.beginPath();
        ctx.moveTo(canvas.width - 256, titleLineBreakY);
        ctx.lineTo(canvas.width - 396, titleLineBreakY);
        ctx.lineTo(canvas.width - 396, titleLineBreakY + 3);
        ctx.lineTo(canvas.width - 256, titleLineBreakY + 3);
        ctx.closePath();
        ctx.fill();
        //add shots text
        ctx.font = `normal bold 50pt sans-serif`;
        ctx.fillStyle = data.additional.away.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(data.highLevelStats.visitingTeam.stats.shots, 874, 260);

        //add puck logos
        let puck = new Image();
        puck.src = `box_graphic_images/puck.png`;
        puck.onload = () => {
            //left
            drawImageScaled(puck, ctx, 200, 50, 226, 165);
            //right
            drawImageScaled(puck, ctx, 200, 50, 774, 165);
        }
        let oneUp = new Image();
        oneUp.src = `box_graphic_images/1up.png`;
        oneUp.onload = () => {
            //left
            drawImageScaled(oneUp, ctx, 200, 40, 11, 165);
            //right
            drawImageScaled(oneUp, ctx, 200, 40, 988, 165);
        }

        //draw lower left player highlight box
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(11, middleRowLowerYBound + 10); //67 / 81 = .83
        ctx.lineTo(426, middleRowLowerYBound + 10);
        ctx.lineTo(530, canvas.height - 10);
        ctx.lineTo(11, canvas.height - 10);
        ctx.closePath();
        ctx.fill();
        //add title
        ctx.font = `normal bold 14pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PLAYER', 100, 410);
        ctx.fillText('HIGHLIGHT', 100, 435);
        //draw header line (rectangle)
        ctx.fillStyle = '#cecece';
        ctx.beginPath();
        ctx.moveTo(180, 380);
        ctx.lineTo(183, 380);
        ctx.lineTo(183, 470);
        ctx.lineTo(180, 470);
        ctx.closePath();
        ctx.fill();
        //add player number and position
        let homeHP = determineHighlightedPlayerHome(data);
        ctx.font = `normal 14pt sans-serif`;
        ctx.fillStyle = data.additional.home.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`#${homeHP.number} ${homeHP.position}`, 320, 400);
        ctx.font = `normal bold 20pt sans-serif`;
        ctx.fillStyle = data.additional.home.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${homeHP.firstName} ${homeHP.lastName}`, 320, 425);
        ctx.font = `normal bold 18pt sans-serif`;
        ctx.fillStyle = data.additional.home.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${homeHP.message}`, 320, 455);

        //draw date trapezoid
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(440, middleRowLowerYBound + 10); //67 / 81 = .83
        ctx.lineTo(canvas.width - (426 + 14), middleRowLowerYBound + 10);
        ctx.lineTo(canvas.width - (426 + 14) - 104, canvas.height - 10);
        ctx.lineTo(544, canvas.height - 10);
        ctx.closePath();
        ctx.fill();
        //add date text
        ctx.font = `normal bold 20pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('GAME SUMMARY', 600, 400);
        const dashedDate = data.highLevelStats.details.GameDateISO8601;
        const date = new Date(dashedDate).toDateString();
        ctx.font = `normal 14pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(date, 600, 430);

        //draw lower right player highlight box
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(canvas.width - 11, middleRowLowerYBound + 10); //67 / 81 = .83
        ctx.lineTo(canvas.width - 426, middleRowLowerYBound + 10);
        ctx.lineTo(canvas.width - 530, canvas.height - 10);
        ctx.lineTo(canvas.width - 11, canvas.height - 10);
        ctx.closePath();
        ctx.fill();
        //add title
        ctx.font = `normal bold 14pt sans-serif`;
        ctx.fillStyle = '#221d1f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PLAYER', canvas.width - 100, 410);
        ctx.fillText('HIGHLIGHT', canvas.width - 100, 435);
        //draw header line (rectangle)
        ctx.fillStyle = '#cecece';
        ctx.beginPath();
        ctx.moveTo(canvas.width - 180, 380);
        ctx.lineTo(canvas.width - 183, 380);
        ctx.lineTo(canvas.width - 183, 470);
        ctx.lineTo(canvas.width - 180, 470);
        ctx.closePath();
        ctx.fill();
        //add player number and position
        let awayHP = determineHighlightedPlayerAway(data);
        ctx.font = `normal 14pt sans-serif`;
        ctx.fillStyle = data.additional.away.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`#${awayHP.number} ${awayHP.position}`, canvas.width - 320, 400);
        ctx.font = `normal bold 20pt sans-serif`;
        ctx.fillStyle = data.additional.away.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${awayHP.firstName} ${awayHP.lastName}`, canvas.width - 320, 425);
        ctx.font = `normal bold 18pt sans-serif`;
        ctx.fillStyle = data.additional.away.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${awayHP.message}`, canvas.width - 320, 455);

   
        

        setShouldDraw(false);


    }, []);
    if (!shouldDraw) return <></>;

    return <div> </div>;
}

function determineHighlightedPlayerHome(data) {
    //see if home team got a shutout
    if (data.highLevelStats.visitingTeam.stats.goals === 0) {
        return {
            number: data.highLevelStats.homeTeam.goalieLog[0].info.jerseyNumber,
            position: 'G',
            firstName: data.highLevelStats.homeTeam.goalieLog[0].info.firstName,
            lastName: data.highLevelStats.homeTeam.goalieLog[0].info.lastName,
            message: `SHUTOUT (${data.highLevelStats.homeTeam.goalieLog[0].stats.saves} SAVES)`
        }
    } else {
        let homeArr = data.highLevelStats.homeTeam.skaters
        let res = Math.max.apply(Math, homeArr.map(function (o) { return o.stats.points; }))
        let mostPtsArr = homeArr.filter(o => {
            return o.stats.points == res;
        })
        let mostGoalsPlayer, mostAssistsPlayer
        if (mostPtsArr.length > 1) {
            let mostGoals = Math.max.apply(Math, homeArr.map(function (o) { return o.stats.goals; }))
            let mostGoalsArr = homeArr.filter(o => {
                return o.stats.goals == mostGoals;
            })
            if (mostGoalsArr.length > 1) {
                // get random index value
                const randomIndex = Math.floor(Math.random() * mostGoalsArr.length);

                // get random item
                mostGoalsPlayer = mostGoalsArr[randomIndex];
            } else {
                mostGoalsPlayer = mostGoalsArr[0];
            }
            let mostAssists = Math.max.apply(Math, homeArr.map(function (o) { return o.stats.assists; }))
            let mostAssistsArr = homeArr.filter(o => {
                return o.stats.assists == mostAssists;
            })
            if (mostAssistsArr.length > 1) {
                // get random index value
                const randomIndex = Math.floor(Math.random() * mostAssistsArr.length);

                // get random item
                mostAssistsPlayer = mostAssistsArr[randomIndex];
            } else {
                mostAssistsPlayer = mostAssistsArr[0];
            }

            if (mostAssistsPlayer.stats.assists > mostGoalsPlayer.stats.goals) {
                return {
                    number: mostAssistsPlayer.info.jerseyNumber,
                    position: mostAssistsPlayer.info.position,
                    firstName: mostAssistsPlayer.info.firstName,
                    lastName: mostAssistsPlayer.info.lastName,
                    message: `${mostAssistsPlayer.stats.assists} ASSISTS`
                }
            } else if (mostGoalsPlayer.stats.goals === 1) {
                return {
                    number: mostGoalsPlayer.info.jerseyNumber,
                    position: mostGoalsPlayer.info.position,
                    firstName: mostGoalsPlayer.info.firstName,
                    lastName: mostGoalsPlayer.info.lastName,
                    message: `${mostGoalsPlayer.stats.goals} GOAL`
                }
            } else if (mostGoalsPlayer.stats.goals > 1) {
                return {
                    number: mostGoalsPlayer.info.jerseyNumber,
                    position: mostGoalsPlayer.info.position,
                    firstName: mostGoalsPlayer.info.firstName,
                    lastName: mostGoalsPlayer.info.lastName,
                    message: `${mostGoalsPlayer.stats.goals} GOALS`
                }
            } else {
                let res = Math.max.apply(Math, homeArr.map(function (o) { return o.stats.penaltyMinutes; }))
                let mostPenaltiesArr = homeArr.filter(o => {
                    return o.stats.penaltyMinutes == res;
                })
                let mostPenalties = mostPenaltiesArr[0];
                return {
                    number: mostPenalties.info.jerseyNumber,
                    position: mostPenalties.info.position,
                    firstName: mostPenalties.info.firstName,
                    lastName: mostPenalties.info.lastName,
                    message: `${mostPenalties.stats.penaltyMinutes} PENALTY MINUTES`
                }
            }
        } else if (mostPtsArr.length === 1) {
            let mostPtsPlayer = mostPtsArr[0]
            if (mostPtsPlayer.stats.goals >= mostPtsPlayer.stats.assists) {
                mostGoalsPlayer = mostPtsPlayer
                if (mostGoalsPlayer.stats.goals === 1) {
                    return {
                        number: mostGoalsPlayer.info.jerseyNumber,
                        position: mostGoalsPlayer.info.position,
                        firstName: mostGoalsPlayer.info.firstName,
                        lastName: mostGoalsPlayer.info.lastName,
                        message: `${mostGoalsPlayer.stats.goals} GOAL`
                    }
                } else {
                    return {
                        number: mostGoalsPlayer.info.jerseyNumber,
                        position: mostGoalsPlayer.info.position,
                        firstName: mostGoalsPlayer.info.firstName,
                        lastName: mostGoalsPlayer.info.lastName,
                        message: `${mostGoalsPlayer.stats.goals} GOALS`
                    }
                }
            } else {
                mostAssistsPlayer = mostPtsPlayer
                return {
                    number: mostAssistsPlayer.info.jerseyNumber,
                    position: mostAssistsPlayer.info.position,
                    firstName: mostAssistsPlayer.info.firstName,
                    lastName: mostAssistsPlayer.info.lastName,
                    message: `${mostAssistsPlayer.stats.assists} ASSISTS`
                }
            }
        }
    }
}

function determineHighlightedPlayerAway(data) {
    // let homeArr = [{
    //     "info": {
    //         "id": 9161,
    //         "firstName": "Cade",
    //         "lastName": "Street",
    //         "jerseyNumber": 2,
    //         "position": "D",
    //         "birthDate": "1998-12-19",
    //         "playerImageURL": "https://assets.leaguestat.com/acha/120x160/9161.jpg"
    //     },
    //     "stats": {
    //         "goals": 1,
    //         "assists": 1,
    //         "points": 2,
    //         "penaltyMinutes": 0,
    //         "plusMinus": 0,
    //         "faceoffAttempts": 0,
    //         "faceoffWins": 0,
    //         "shots": 0,
    //         "hits": 0
    //     },
    //     "starting": 1,
    //     "status": ""
    // },
    // {
    //     "info": {
    //         "id": 9161,
    //         "firstName": "ye",
    //         "lastName": "ty",
    //         "jerseyNumber": 2,
    //         "position": "D",
    //         "birthDate": "1998-12-19",
    //         "playerImageURL": "https://assets.leaguestat.com/acha/120x160/9161.jpg"
    //     },
    //     "stats": {
    //         "goals": 0,
    //         "assists": 2,
    //         "points": 2,
    //         "penaltyMinutes": 0,
    //         "plusMinus": 0,
    //         "faceoffAttempts": 0,
    //         "faceoffWins": 0,
    //         "shots": 0,
    //         "hits": 0
    //     },
    //     "starting": 1,
    //     "status": ""
    // }]
    //see if home team got a shutout
    if (data.highLevelStats.homeTeam.stats.goals === 0) {
        return {
            number: data.highLevelStats.visitingTeam.goalieLog[0].info.jerseyNumber,
            position: 'G',
            firstName: data.highLevelStats.visitingTeam.goalieLog[0].info.firstName,
            lastName: data.highLevelStats.visitingTeam.goalieLog[0].info.lastName,
            message: `SHUTOUT (${data.highLevelStats.visitingTeam.goalieLog[0].stats.saves} SAVES)`
        }
    } else {
        let visitingArr = data.highLevelStats.visitingTeam.skaters
        let res = Math.max.apply(Math, visitingArr.map(function (o) { return o.stats.points; }))
        let mostPtsArr = visitingArr.filter(o => {
            return o.stats.points == res;
        })
        let mostGoalsPlayer, mostAssistsPlayer
        if (mostPtsArr.length > 1) {
            let mostGoals = Math.max.apply(Math, visitingArr.map(function (o) { return o.stats.goals; }))
            let mostGoalsArr = visitingArr.filter(o => {
                return o.stats.goals == mostGoals;
            })
            if (mostGoalsArr.length > 1) {
                // get random index value
                const randomIndex = Math.floor(Math.random() * mostGoalsArr.length);

                // get random item
                mostGoalsPlayer = mostGoalsArr[randomIndex];
            } else {
                mostGoalsPlayer = mostGoalsArr[0];
            }
            let mostAssists = Math.max.apply(Math, visitingArr.map(function (o) { return o.stats.assists; }))
            let mostAssistsArr = visitingArr.filter(o => {
                return o.stats.assists == mostAssists;
            })
            if (mostAssistsArr.length > 1) {
                // get random index value
                const randomIndex = Math.floor(Math.random() * mostAssistsArr.length);

                // get random item
                mostAssistsPlayer = mostAssistsArr[randomIndex];
            } else {
                mostAssistsPlayer = mostAssistsArr[0];
            }
            console.log(mostAssistsPlayer)
            if (mostAssistsPlayer.stats.assists > mostGoalsPlayer.stats.goals) {
                return {
                    number: mostAssistsPlayer.info.jerseyNumber,
                    position: mostAssistsPlayer.info.position,
                    firstName: mostAssistsPlayer.info.firstName,
                    lastName: mostAssistsPlayer.info.lastName,
                    message: `${mostAssistsPlayer.stats.assists} ASSISTS`
                }
            } else if (mostGoalsPlayer.stats.goals === 1) {
                return {
                    number: mostGoalsPlayer.info.jerseyNumber,
                    position: mostGoalsPlayer.info.position,
                    firstName: mostGoalsPlayer.info.firstName,
                    lastName: mostGoalsPlayer.info.lastName,
                    message: `${mostGoalsPlayer.stats.goals} GOAL`
                }
            } else if (mostGoalsPlayer.stats.goals > 1) {
                return {
                    number: mostGoalsPlayer.info.jerseyNumber,
                    position: mostGoalsPlayer.info.position,
                    firstName: mostGoalsPlayer.info.firstName,
                    lastName: mostGoalsPlayer.info.lastName,
                    message: `${mostGoalsPlayer.stats.goals} GOALS`
                }
            } else {
                let res = Math.max.apply(Math, visitingArr.map(function (o) { return o.stats.penaltyMinutes; }))
                let mostPenaltiesArr = visitingArr.filter(o => {
                    return o.stats.penaltyMinutes == res;
                })
                let mostPenalties = mostPenaltiesArr[0];
                return {
                    number: mostPenalties.info.jerseyNumber,
                    position: mostPenalties.info.position,
                    firstName: mostPenalties.info.firstName,
                    lastName: mostPenalties.info.lastName,
                    message: `${mostPenalties.stats.penaltyMinutes} PENALTY MINUTES`
                }
            }
        } else if (mostPtsArr.length === 1) {
            let mostPtsPlayer = mostPtsArr[0]
            if (mostPtsPlayer.stats.goals >= mostPtsPlayer.stats.assists) {
                mostGoalsPlayer = mostPtsPlayer
                if (mostGoalsPlayer.stats.goals === 1) {
                    return {
                        number: mostGoalsPlayer.info.jerseyNumber,
                        position: mostGoalsPlayer.info.position,
                        firstName: mostGoalsPlayer.info.firstName,
                        lastName: mostGoalsPlayer.info.lastName,
                        message: `${mostGoalsPlayer.stats.goals} GOAL`
                    }
                } else {
                    return {
                        number: mostGoalsPlayer.info.jerseyNumber,
                        position: mostGoalsPlayer.info.position,
                        firstName: mostGoalsPlayer.info.firstName,
                        lastName: mostGoalsPlayer.info.lastName,
                        message: `${mostGoalsPlayer.stats.goals} GOALS`
                    }
                }
            } else {
                mostAssistsPlayer = mostPtsPlayer
                return {
                    number: mostAssistsPlayer.info.jerseyNumber,
                    position: mostAssistsPlayer.info.position,
                    firstName: mostAssistsPlayer.info.firstName,
                    lastName: mostAssistsPlayer.info.lastName,
                    message: `${mostAssistsPlayer.stats.assists} ASSISTS`
                }
            }
        }
    }
}

function drawImageScaled(img, ctx, wrapperRectWidth, wrapperRectHeight, offsetX, offsetY) {
    var hRatio = wrapperRectWidth / img.width;
    var vRatio = wrapperRectHeight / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = ((wrapperRectWidth - img.width * ratio) / 2) + offsetX;
    var centerShift_y = ((wrapperRectHeight - img.height * ratio) / 2) + offsetY;
    ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}

function finalText(status) {
    if (/.*SO.*/.test(status)) {
        return {
            text: 'FINAL/SO',
            font: '25pt'
        };
    }
    else if (/.*OT.*/.test(status)) {
        return {
            text: 'FINAL/OT',
            font: '25pt'
        };
    } else {
        return {
            text: 'FINAL',
            font: '35pt'
        };
    }
}

function fontSizing(text) {
    let characters = text.length;
    let n = '';
    if (characters <= 10) {
        n = '35pt';
    } else if (characters <= 12) {
        n = '30pt';
    } else if (characters <= 15) {
        n = '25pt';
    } else if (characters <= 19) {
        n = '20pt';
    } else {
        n = '15pt';
    }
    return n;
}

function DownloadImage(props) {
    const data = props.data;
    let fileName = `${data.highLevelStats.homeTeam.info.abbreviation}vs${data.highLevelStats.visitingTeam.info.abbreviation}_${data.highLevelStats.details.GameDateISO8601.split('T')[0]}.png`;
    return (
        <button
            className="button2"
            id="download_button2"
            onClick={() => {
                downloadCanvasAsImage(fileName);
            }}
        >
            Download Image
        </button>
    );
}

function downloadCanvasAsImage(fileName) {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', fileName);
    let canvas = document.getElementsByTagName('canvas')[1];
    canvas.toBlob(function (blob) {
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    }, 'image/jpeg', 0.5);
}


export default BoxGraphic;

/* <div className="bg_Background">
                <div className="bg_TopNamesContianer">
                    <div className="bg_TopLeftContainer">
                        <div className="bg_LeftLogoBox">
                        </div>
                        <div className="bg_LeftLogoNameDividerStripe">
                        </div>
                        <div className="bg_LeftNameRect">
                        </div>
                    </div>
                    <div className="bg_LeftScoreBox">
                    </div>
                    <div className="bg_RightScoreBox">
                    </div>
                    <div className="bg_TopRightContainer">
                        <div className="bg_RightNameRect">
                        </div>
                        <div className="bg_RightLogoNameDividerStripe">
                        </div>
                        <div className="bg_RightLogoBox">
                        </div>
                    </div>
                </div>
                <div className="bg_MiddleDataContianer">
                    <div className="bg_DataBox">
                        <h3>PLAYER HIGHLIGHT</h3>
                        <div className="bg_TitleBar"></div>
                    </div>
                    <div className="bg_DataBox">
                    </div>
                    <div className="bg_ScoreBox">
                    </div>
                    <div className="bg_DataBox">
                    </div>
                    <div className="bg_DataBox">
                    </div>
                </div>
            </div> */