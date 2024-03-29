import React from "react";
import styles from "../../../styles/Realtime.module.css";
import config from "../../../config.json";
import { PlayerData } from '../../../components/statsInterface';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRef } from 'react';
import Countup from "../../../components/Countup";
import Nav from "../../../components/nav";
import Head from "next/head";
const sessionStartTime = new Date()

export default function Realtime() {
    async function getStats(username: string) {
        try {
          let API_KEY = config.NEXT_HYPIXEL_API_KEY || process.env.NEXT_HYPIXEL_API_KEY;
      
          // Query Mojang API for UUID based on username
          const mojangRes = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`, {
            mode: 'cors'
          });
          if (!mojangRes.ok) {
            throw new Error(`Error getting UUID from Mojang API: ${mojangRes.statusText}`);
          }
          const mojangData = await mojangRes.json();
          const uuid = mojangData.uuid;
      
          // Query Hypixel API with UUID
          const hypixelRes = await fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${uuid}`);
          if (!hypixelRes.ok) {
            throw new Error(`Error getting stats from Hypixel API: ${hypixelRes.statusText}`);
          }
          const hypixelData = await hypixelRes.json();
          if (!hypixelData.success) {
            throw new Error(`API error : ${hypixelData.cause || "idk?"}`);
          }
          setData(hypixelData);
        } catch (error) {
          console.error(`Failed to retrieve stats for ${username}: ${error}`);
          throw error;
        }
      }
      
      const [data, setData] = useState<PlayerData>();
  const [originalData, setOriginalData] = useState<PlayerData>();
  const router = useRouter();
  const { uuid } = router.query;

  console.log(data)

  useEffect(() => {
    if (uuid) {
      getStats(uuid as string);
      const intervalId = setInterval(() => {
        getStats(uuid as string);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [uuid]);

  useEffect(() => {
    if (data && !originalData) {
      setOriginalData(data);
    }
  }, [data, originalData]);

  useEffect(() => {
    if (data && originalData) {
      if (JSON.stringify(data.player.stats) !== JSON.stringify(originalData.player.stats)) {
        console.log('Stats have changed!');
      }
    }
  }, [data, originalData]);
    return (
        <>
        <Head>
          <title>{data?.player.displayname} | tysonlmao.dev</title>
        </Head>
          <Nav/>
          <aside className={`${styles.asidemenu}`}>
            <h4>Preferences</h4>
            <div>
              <hr />
              <p>Theme</p>
              <hr />
              <p>API key</p>
            </div>
          </aside>
          <div className={`container-fluid ${styles.body}`}>
                <br/>
                <div className={`container-fluid ${styles.statcontainer}`}>
                
                <h2 className={`text-center mt-1 ${styles.stattitle}`}>{data?.player.displayname}</h2>
                <div className={`text-center ${styles.stattitle} text-white`}>
                  <Countup startTime={sessionStartTime}/>
                </div>
                    <h2 className={styles.sessiontitle}>LIVE SESSION</h2>
                    </div>
                    <div className={styles.statcontainer}>
                    {originalData && (
                      <>
                    <div className={`row text-center ${styles.text}`}>
                    <h3 className={styles.sessiontitle}>BEDWARS</h3>
                        {data && (
                          <>
                            <div className="col-sm">
                            <p className={styles.stattitle}>Wins</p>
                            <h3 className={styles.stat}>+{data.player.stats.Bedwars.wins_bedwars - originalData.player.stats.Bedwars.wins_bedwars}</h3>
                            </div>
                            <div className="col-sm">
                            <p className={styles.stattitle}>Finals</p>
                            <h3 className={styles.stat}>+{data.player.stats.Bedwars.final_kills_bedwars - originalData.player.stats.Bedwars.final_kills_bedwars}</h3>
                            </div>
                            <div className="col-sm">
                            <p className={styles.stattitle}>Beds</p>
                            <h3 className={styles.stat}>+{data.player.stats.Bedwars.beds_broken_bedwars - originalData.player.stats.Bedwars.beds_broken_bedwars}</h3>
                            </div>
                        </>
                        )}
                    </div>
                    {data && (
                      <>
                    <div className={`row text-center  ${styles.text}`}>
                      <div className="col-sm">
                        <p className={styles.stattitle}>Games <br /> lost</p>
                        <h3 className={styles.statdanger}>+{data.player.stats.Bedwars.losses_bedwars - originalData.player.stats.Bedwars.losses_bedwars}</h3>
                      </div>
                      <div className="col-sm">
                        <p className={styles.stattitle}>Final <br />deaths</p>
                        <h3 className={styles.statdanger}>+{data.player.stats.Bedwars.final_deaths_bedwars - originalData.player.stats.Bedwars.final_deaths_bedwars}</h3>
                      </div>
                      <div className="col-sm">
                        <p className={styles.stattitle}>Beds <br /> lost</p>
                        <h3 className={styles.statdanger}>+{data.player.stats.Bedwars.beds_lost_bedwars - originalData.player.stats.Bedwars.beds_lost_bedwars}</h3>
                      </div>
                    </div>
                    <div className={`row text-center ${styles.text}`}>
                      <div className="col-sm">
                        <p className={styles.stattitle}>
                          WLR
                        </p>
                        <h3 className={styles.stat}>TBA</h3>
                      </div>
                      <div className="col-sm">
                        <p className={styles.stattitle}>FKDR</p>
                        <h3 className={styles.stat}>TBA</h3>
                      </div>
                      <div className="col-sm">
                        <p className={styles.stattitle}>BBLR</p>
                        <h3 className={styles.stat}>TBA</h3>
                      </div>
                    </div>
                    </>
                    )}
                      </>
                    )}


                </div>
            <div className={`container-fluid ${styles.statcontainer}`}>
                    {originalData && (
                      <div className={`row text-center ${styles.text}`}>
                        {/* <h3 className={styles.sessiontitle}>DUELS</h3> */}
                        {data && (
                          <>
                          <h3 className={styles.sessiontitle}>DUELS</h3>
                            <div className="col-sm">
                              <p className={styles.stattitle}>Wins</p>
                              <h3 className={styles.stat}>{data.player.stats.Duels.wins}</h3>

                              <p className={styles.stattitle}>S/WIN</p>
                              <h3 className={styles.stat}>{data.player.stats.Duels.wins - originalData.player.stats.Duels.wins}</h3>
                            </div>
                            <div className="col-sm">
                              <p className={styles.stattitle}>WLR</p>
                              <h3 className={styles.stat}>{Math.round(data.player.stats.Duels.wins / data.player.stats.Duels.losses * 100) /100}</h3>
                              <p className={styles.stattitle}>S/KILL</p>
                              <h3 className={styles.stat}>{data.player.stats.Duels.kills - originalData.player.stats.Duels.kills}</h3>
                            </div>
                              <div className="col-sm">
                              <p className={styles.stattitle}>Kills</p>
                              <h3 className={styles.stat}>{data.player.stats.Duels.kills}</h3>
                              <p className={styles.stattitle}>S/KDR</p>
                            <h3 className={styles.stat}>{Math.round((data.player.stats.Duels.kills - originalData.player.stats.Duels.kills) / (data.player.stats.Duels.deaths - originalData.player.stats.Duels.deaths) * 100) / 100}</h3>
                            </div>
                            <div className="col-sm">
                            <p className={styles.stattitle}>KDR</p>
                            <h3 className={styles.stat}>{Math.round(data.player.stats.Duels.kills / data.player.stats.Duels.deaths * 100) /100}</h3>
                              <p className={styles.stattitle}>S/WLR</p>
                            <h3 className={styles.stat}>{Math.round((data.player.stats.Duels.wins - originalData.player.stats.Duels.wins) / (data.player.stats.Duels.losses - originalData.player.stats.Duels.losses) * 100) / 100}</h3>
                          </div>
                        </>
                        )}
                    </div>
                    )}
            </div>
            </div>
            {/* <p>Notice: This page is not recommended for use on mobile.</p> */}
        </>
    )
}