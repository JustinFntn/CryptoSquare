<template>
  <div>
    <UButton @click="addClue">
      Add a Clue
    </UButton>

    <div class="mt-4 grid auto-rows-fr grid-cols-3 gap-2">


      <UCard v-for="(clue, index) in clues" :key="index" :class="getClueBgColor(clue)">
        <p>{{ ordinal(index + 1) }} clue</p>
        <UFormGroup label="Difficulty" name="difficulty">
          <USelect v-model="clue.difficulty" :options="['Easy', 'Medium', 'Hard']" />
        </UFormGroup>

        <UFormGroup label="Clue text" name="textEnigme">
          <UInput v-model="clue.textEnigme" />
        </UFormGroup>

        <UFormGroup label="Penalty" name="value">
          <UInput v-model="clue.value" />
        </UFormGroup>
      </UCard>
    </div>

  </div>
</template>

<script lang="ts" setup>

interface Clue {
  difficulty: string;
  textEnigme: string;
  value: number;
}

// Explicitly define the model type
const clues = defineModel<Clue[]>();




function addClue() {
  if (clues.value)
    clues.value.push({ difficulty: 'Easy', textEnigme: '', value: 0 });
}


const getClueBgColor = computed(() => (clue: any) => {
  const baseClass = "bg-gradient-to-br from-gray-800 ";

  if (clue.difficulty === 'Easy') {
    return baseClass + 'to-green-500';
  } else if (clue.difficulty === 'Medium') {
    return baseClass + 'to-yellow-500';
  } else if (clue.difficulty === 'Hard') {
    return baseClass + 'to-red-500';
  }
});

const english_ordinal_rules = new Intl.PluralRules("en", { type: "ordinal" });
const suffixes = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th"
};
function ordinal(number: number): string {
  const category = english_ordinal_rules.select(number);
  const suffix = suffixes[category as keyof typeof suffixes];
  return (number + suffix);
}

</script>

<style></style>
