<template>
    <div class="w-56 border dark:border-neutral-800 rounded-lg">
        <div :class="backgroundClass" class="flex flex-col justify-end items-center rounded-t-lg h-20 py-2 relative">
            <UBadge :label="'Completed'" class="w-fit capitalize absolute top-2 left-2" icon="i-lucide-badge-check"
                :color="buttonColor" v-if="isCompleted" />
            <UBadge :label="difficulty" class="w-fit capitalize absolute top-2 right-2" :color="buttonColor"
                variant="soft" />
            <h1 class="font-semibold line-clamp-2 text-center" :class="textClass">{{ title }}</h1>
        </div>
        <div class="px-2 py-1">
            <p class="text-sm line-clamp-2">
                {{ subtitle }}
            </p>
            <UButton size="2xs" block label="Start challenge" class="my-2" icon="i-lucide-arrow-right"
                :color="buttonColor" :to="`/dashboard/challenges/${props._id}`" />
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
    },
    _id: {
        type: Number,
        required: true
    }
});

// Computed property for the button color based on difficulty
const buttonColor = computed(() => {
    const { difficulty } = props; // Access difficulty prop
    switch (difficulty) {
        case 'easy':
            return 'green';
        case 'medium':
            return 'amber';
        case 'hard':
            return 'red';
        default:
            return 'blue'; // Default color if no valid difficulty is provided
    }
});

// Computed property for the background color of the card based on difficulty
const backgroundClass = computed(() => {
    const { difficulty } = props; // Access difficulty prop
    switch (difficulty) {
        case 'easy':
            return 'bg-green-200';
        case 'medium':
            return 'bg-yellow-200';
        case 'hard':
            return 'bg-red-200';
        default:
            return 'bg-blue-200'; // Default background color
    }
});

// Dynamically applying the correct text color class based on buttonColor
const textClass = computed(() => {
    const color = buttonColor.value;  // Get the current button color
    return `text-${color}-500`;       // Generate the text color class (e.g., text-green-900)
});

console.log(props)
</script>
