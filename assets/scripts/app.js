/**
 * attack
 */
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

/**
 * LOG
 */
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER"
/**
 * HEAL
 */
let HEAL_VALUE = 5;

const enteredValue = prompt("Life Setup", "100");
let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
  alert("0이하 이거나, 문자열 이면 초기 값을 100으로 설정 합니다.");
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = []

function writeLog(ev, val, monsterHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: currentMonsterHealth,
    finalPlayerHealth: playerHealthBar
  }

  // switch (ev){
  //   case LOG_EVENT_PLAYER_STRONG_ATTACK:
  //     logEntry.target = "MONSTER"
  //     break;
  //   case LOG_EVENT_MONSTER_ATTACK:
  //     logEntry.target = "PLAYER"
  //     break;
  //   default:
  //     logEntry.target = "default"
  //       --

  if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = "PLAYER";
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = "PLAYER";
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: currentMonsterHealth,
      finalPlayerHealth: playerHealthBar
    }
  }
  battleLog.push(logEntry);
}

adjustHealthBars(chosenMaxLife)

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function bonusGame() {
  hasBonusLife = false;
  removeBonusLife();
  currentPlayerHealth = 50;
  setPlayerHealth(currentPlayerHealth);
  alert("한번의 기회")
}

function endRound() {
  if (currentPlayerHealth <= 0 && hasBonusLife && currentMonsterHealth >= 1) {
    bonusGame();
    return;
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("win");
    writeLog(LOG_EVENT_GAME_OVER, "PLAYER WON", currentMonsterHealth,
        currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("lost");
    writeLog(LOG_EVENT_MONSTER_ATTACK, "MONSTER WON", currentMonsterHealth,
        currentPlayerHealth);
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("draw");
    writeLog(LOG_EVENT_MONSTER_ATTACK, "DRAW", currentMonsterHealth,
        currentPlayerHealth);
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }

}

function attackMonsterHandler(mode) {
  let logEvent;
  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK
  // } else {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  endRound();
  writeLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
}

function attackHandler() {
  attackMonsterHandler(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonsterHandler(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("currentPlayerHealth 100")
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE + Math.random();
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  writeLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth,
      currentPlayerHealth);
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < battleLog.length; i++) {
    console.log("-----");
  }
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);