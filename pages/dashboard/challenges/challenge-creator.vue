<template>
  <div class="lg:p-16 flex flex-col items-center space-y-8">

    <h2 class="text-2xl">Create a challenge</h2>
    <p>Fill in the form bellow or import a Markdown file to create a Challenge!</p>


    <UForm :schema="schema" :state="state" class="space-y-4 dark:text-white-400 mt-8" @submit="onSubmit">

      <UFormGroup label="Import from markdown" name="markdownImport" class="pb-4 mb-4 border-b-2 border-black-200">
        <div class="flex flex-row space-x-4">
          <input type="file" name="markdownInout" id="markdownInput" @change="onFileUpload" />

          <UButton @click="downloadTemplate" icon="i-lucide-download">

            Download Template
          </UButton>
        </div>

      </UFormGroup>

      <UFormGroup label="Title" name="title" required>
        <UInput v-model="state.title" color="primary" />
      </UFormGroup>

      <UFormGroup label="Subtitle" name="subtitle">
        <UInput v-model="state.subtitle" />
      </UFormGroup>

      <UFormGroup label="Difficulty" name="difficulty">
        <USelect v-model="state.difficulty" :options="['easy', 'medium', 'hard']" />
      </UFormGroup>

      <UFormGroup label="Content" name="content">
        <UTextarea autoresize :maxrows="8" placeholder="Add text (markdown format supported)" v-model="state.content" />
      </UFormGroup>

      <UFormGroup label="Base Points" name="basePoints">
        <UInput v-model="state.basePoints" />
      </UFormGroup>

      <UFormGroup label="Clues" name="clues">
        <CluesInput v-model="state.clues" />
      </UFormGroup>

      <UFormGroup label="Answer" name="answer">
        <UInput v-model="state.answer" />
      </UFormGroup>


      <UButton type="submit" :disabled="submitButtonState.error"
        :color="submitButtonState.error ? 'red' : submitButtonState.sent ? 'green' : 'primary'"
        :loading="submitButtonState.loading" :icon="submitButtonState.error ? 'i-lucide-circle-x' : submitButtonState.sent ? 'i-lucide-check' : 'i-lucide-send'
          ">
        <!-- ? l'icône d'erreur ne s'affiche pas, probablement à cause du "loading" -->
        {{
          submitButtonState.error ? 'Error while sending' :
            submitButtonState.sent ? 'Sent' : 'Submit'
        }}
      </UButton>
    </UForm>

  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
let parse: (input: string) => any;

if (import.meta.client) {
  import('yaml').then((yaml) => {
    parse = yaml.parse;
  });
}


const schema = z.object({
  title: z.string().nonempty('Title is required'),
  subtitle: z.string().nonempty('Subtitle is required'),
  difficulty: z.string().nonempty('Difficulty is required'),
  // TODO - verify difficulty against LoV (Easy, Medium, Hard)
  // TODO - Difficulty is currently linked between the challenge and the clues. If not set on the challenge, it generates an error on the clues (while it shouldn't)
  content: z.string().nonempty('Content is required'),
  basePoints: z.number(),
  clues: z.array(z.object({
    difficulty: z.string().nonempty('Difficulty is required'),
    textEnigme: z.string().nonempty('Text Enigme is required'),
    value: z.number()
  })),
  answer: z.string().nonempty('Answer is required')
})

type Schema = z.output<typeof schema>


const state = ref<Schema>({
  title: '',
  subtitle: '',
  difficulty: '',
  content: '',
  basePoints: 0,
  clues: [{
    difficulty: 'easy',
    textEnigme: 'Clue 1',
    value: 10
  },
  {
    difficulty: 'medium',
    textEnigme: 'Clue 2',
    value: 20
  },
  {
    difficulty: 'hard',
    textEnigme: 'Clue 3',
    value: 30
  },],
  answer: ''
})

const submitButtonState = ref({
  loading: false,
  sent: false,
  error: false,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO - Ajouter l'appel API pour créer le challenge

  submitButtonState.value.loading = true


  try {
    const res = await fetch('/api/challenges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event.data)
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    submitButtonState.value.loading = false
    submitButtonState.value.sent = true

    setTimeout(() => {
      submitButtonState.value.sent = false
    }, 3000)

  } catch (error) {
    submitButtonState.value.loading = false
    submitButtonState.value.sent = false
    submitButtonState.value.error = true
    console.error("Error creating challenge:", error);

    setTimeout(() => {
      submitButtonState.value.error = false
    }, 3000)
  }
}

async function onFileUpload(event: Event) {

  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;
  // if (file.type !== "text/markdown") {
  //   console.error("Invalid file type. Please upload a Markdown file.");
  //   console.log(file.type);
  //   return;
  // }

  const mdContent = await readFileAsText(file);
  // console.log(mdContent);

  const data = mdContent.split('---')[1]?.trim();
  if (!data) return;

  try {
    const challenge = parse(data) as Schema;
    challenge.content = mdContent.split('---').slice(2).join('---').trim();
    Object.assign(state.value, challenge);

    // Ensure clues update reactively
    if (challenge.clues) {
      state.value.clues = [...challenge.clues];
    }
  } catch (error) {
    console.error("Error parsing challenge data:", error);
  }
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}


function downloadTemplate() {
  const template =
    `---
title: Challenge Title
subtitle: Challenge Subtitle
difficulty: easy
content: Challenge Content
basePoints: 100
clues:
  - difficulty: easy
    textEnigme: Clue 1
    value: 10
  - difficulty: medium
    textEnigme: Clue 2
    value: 20
  - difficulty: hard
    textEnigme: Clue 3
    value: 30

answer: Challenge Answer
---

## Challenge Title

This is a very cool challenge! Set in an interesting location, it will test your skills and knowledge :)

There could be multiple paragraphs as well as some \`formatted text\`, *emphasized instructions*, and **important notes**.

### Get started

1. Read the challenge description
2. Solve the clues

### Additional info

If you don't know some important knowledge, search on [Google](https://www.google.com) for more information.`

  const blob = new Blob([template], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'challenge-template.md'
  a.click()

  document.removeChild(a)
}


definePageMeta({
  layout: 'user'
})

useHead({
  title: 'Challenges - Crypto Square'
})


</script>

<style></style>
