<template>
  <div>
    <nav class="w-full justify-between flex border-primary border-b-4 border-solid md:rounded-b-lg shadow-md p-4">
      <ul aria-roledescription="navigation">
        <li><img src="" alt="logo" /></li>
        <li>
          <ULink to="#">Test 1</ULink>
        </li>
        <li>
          <ULink>Link 2</ULink>
        </li>
        <li>
          <ULink>Link 3</ULink>
        </li>
      </ul>

      <ul>
        <SignedOut>
          <li>
            <SignInButton />
          </li>
        </SignedOut>


        <SignedIn>
          <li>
            <UserButton />
          </li>
        </SignedIn>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
