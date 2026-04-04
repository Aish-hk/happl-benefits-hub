

# Plan: Enlarge All 3D Icons, Thin Font, Clean Sidebar, Verify Full Flow

## What Changes

### 1. Sidebar — Remove Icons, Keep Text-Only Elegant Nav
- Remove all lucide icon imports and `<item.icon>` renders from `AppSidebar.tsx`
- Nav items become clean text-only links with subtle active indicator
- Keep logo, collapse toggle, and user avatar
- Result: minimal, elegant sidebar with just text labels

### 2. Global Font Weight — Thinner Throughout
- Update `index.css` Google Fonts import to include weight `200` (Extra Light)
- Set body default `font-weight: 300` (Light)
- Headings use `font-weight: 500` (Medium) instead of `700` (Bold)
- Update all `font-bold` usages across screens to `font-medium` or `font-semibold` where appropriate
- Section headers: `font-semibold` (600), body text: `font-light` (300)

### 3. Enlarge All 3D Icons Across Every Screen

| Screen | Current Size | New Size |
|--------|-------------|----------|
| **BenefitsHome** stat cards | w-28 h-28 | w-36 h-36 |
| **BenefitsHome** enrollment items | w-14 h-14 | w-18 h-18 |
| **BenefitsHome** allowance cards | w-14 h-14 | w-18 h-18 |
| **BenefitsHome** available cards | w-16 h-16 | w-20 h-20 |
| **Marketplace** benefit cards | w-16 h-16 | w-20 h-20 |
| **BenefitInsurance** hero | w-20 h-20 | w-28 h-28 |
| **BenefitAllowance** hero | w-20 h-20 | w-28 h-28 |
| **Spend** benefit rows | w-12 h-12 | w-16 h-16 |
| **Rewards** badges | w-14 h-14 | w-18 h-18 |
| **Rewards** redeem options | w-14 h-14 | w-18 h-18 |
| **EnrollmentFlow** review | w-14 h-14 | w-20 h-20 |
| **EnrollmentFlow** success | w-24 h-24 | w-32 h-32 |

### 4. Verify All 5 Screens Cover the Full Flow
The existing routes already cover the required flow:
- **Screen 1 — Benefits Homepage** (`/` → `BenefitsHome.tsx`): Discover benefits
- **Screen 2 — Benefits Marketplace** (`/marketplace` → `Marketplace.tsx`): Browse available options
- **Screen 3 — Benefit Detail: Insurance** (`/benefit/insurance` → `BenefitInsurance.tsx`): View details
- **Screen 4 — Benefit Detail: Allowance** (`/benefit/allowance` → `BenefitAllowance.tsx`): View details
- **Screen 5 — Enrollment Flow** (`/enroll/:id` → `EnrollmentFlow.tsx`): Activate/enrol
- **Spend** (`/spend`): My Benefits overview
- **Rewards** (`/rewards`): Gamification

All navigation paths are connected end-to-end. No missing links.

## Files Modified
1. `src/index.css` — add weight 200, set lighter defaults
2. `src/components/layout/AppSidebar.tsx` — remove icons from nav items
3. `src/pages/BenefitsHome.tsx` — enlarge icons, thin fonts
4. `src/pages/Marketplace.tsx` — enlarge icons, thin fonts
5. `src/pages/BenefitInsurance.tsx` — enlarge icons, thin fonts
6. `src/pages/BenefitAllowance.tsx` — enlarge icons, thin fonts
7. `src/pages/EnrollmentFlow.tsx` — enlarge icons, thin fonts
8. `src/pages/Spend.tsx` — enlarge icons, thin fonts
9. `src/pages/Rewards.tsx` — enlarge icons, thin fonts

