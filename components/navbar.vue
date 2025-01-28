<template>
  <div class="fixed w-full top-0 z-50 backdrop-blur-xl">
    <UContainer>
      <div class="flex justify-between items-center py-3">
        <ul class="flex gap-3 items-center">
          <li class="pr-4">
            <Logo />
          </li>
          <li>
            <UButton label="Home" variant="ghost" />
          </li>
          <li>
            <UButton label="About" variant="ghost" />
          </li>
        </ul>
        <ul class="flex gap-3">
          <li>
            <ThemeSelector />
          </li>
          <UDivider orientation="vertical" />
          <li>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </li>
          <li>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </div>
    </UContainer>
  </div>
</template>
