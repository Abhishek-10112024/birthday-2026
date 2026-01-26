import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MemoryService } from '../services/memory.service';

export const memoriesUnlockedGuard: CanActivateFn = () => {
  const memoryService = inject(MemoryService);
  const router = inject(Router);

  if (memoryService.areAllMemoriesUnlocked()) {
    return true;
  }

  // Redirect to constellation page if not all memories are unlocked
  router.navigate(['/constellation']);
  return false;
};
