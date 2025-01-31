<template>
  <div>
    <UButton @click="addClue">
      Add a Clue
    </UButton>

    <div class="mt-4 grid auto-rows-fr grid-cols-3 gap-2">

      <UCard v-for="(clue, index) in clues" :key="index"
        :class="`bg-gradient-to-br from-white ${colors[clue.difficulty as keyof typeof colors]} dark:bg-gradient-to-br dark:from-gray-800 dark:${colors[clue.difficulty as keyof typeof colors]}`">
        <p>{{ ordinal(index + 1) }} clue</p>
        <UFormGroup label="Clue color" name="difficulty">
          <USelect v-model="clue.difficulty" :options="['easy', 'medium', 'hard']" />
          <!-- TODO - ajout de la gestion d'indices != 3 dans la page de challenge -->

        </UFormGroup>

        <UFormGroup label="Clue text" name="textEnigme">
          <UInput v-model="clue.textEnigme" />
        </UFormGroup>

        <UFormGroup label="Penalty" name="value">
          <UInput v-model="clue.value" />
        </UFormGroup>

        <UFormGroup class="pt-4 flex justify-end">
          <UButton v-if="index != 0" icon="i-lucide-trash-2" @click="deleteClue(index)" color="red" class="flex-1">
          </UButton>
        </UFormGroup>
      </UCard>
    </div>

  </div>
</template>

<script lang="ts" setup>

interface Clue {
  difficulty: 'easy' | 'medium' | 'hard';
  textEnigme: string;
  value: number;
}

// Explicitly define the model type
const clues = defineModel<Clue[]>();

const colors: Record<Clue['difficulty'], string> = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500'
}


function addClue() {
  if (clues.value)
    clues.value.push({ difficulty: 'easy', textEnigme: '', value: 0 });
}

function deleteClue(index: number) {
  if (clues.value)
    clues.value.splice(index, 1);
}

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
