/**
 * attack
 */
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;

/**
 * HEAL
 */
const HEAL_VALUE = 20;

const enteredValue = prompt("Life Setup","100");
let chosenMaxLife = parseInt(enteredValue);
if(isNaN(chosenMaxLife) || chosenMaxLife <= 0){
  chosenMaxLife = 100;
  alert("0이하 이거나, 문자열 이면 초기 값을 100으로 설정 합니다.");
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

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
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("lost");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("draw");
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }

}

function attackMonsterHandler(mode) {
  let maxDamage;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  endRound();
}

function attackHandler() {
  attackMonsterHandler("ATTACK");
}

function strongAttackHandler() {
  attackMonsterHandler("STRONG_ATTACK");
}

function healPlayerHandler() {
  if (currentPlayerHealth >= 100) {
    alert("currentPlayerHealth 100")
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound()
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler)