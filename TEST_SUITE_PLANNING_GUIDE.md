# React Native Test Suite Planning Guide

## Critical Infrastructure Questions (Ask FIRST)

Based on repeated failures in React Native testing setups, these **technical validation questions** must be answered before writing any tests. Process planning is worthless without technical compatibility.

---

## 🔧 **Phase 1: Technical Stack Validation (10% of time)**

### **1. Framework Compatibility Check**
- **"What testing framework works reliably with this React Native version?"**
  - Check package.json React Native version
  - Verify testing framework compatibility matrix
  - **Jest vs Vitest**: Jest has better React Native support, Vitest has module resolution issues with Expo
  - **Decision Point**: Choose Jest for Expo/React Native projects unless proven Vitest config exists

### **2. Module Resolution Validation**
- **"Can the testing framework resolve all imports used in this project?"**
  - Test import resolution for: `@/`, `expo-*`, `@expo/*`, `react-native-*`
  - **Critical**: Expo modules often have parsing/transform issues in test environments
  - **Validation Step**: Create minimal test importing one component to verify resolution works

### **3. Mock Infrastructure Assessment**
- **"What level of mocking is required for this React Native project?"**
  - Inventory all native modules: Expo modules, React Native Animated, Platform APIs
  - **Decision**: Mock everything native OR use React Native testing environment
  - **Test Early**: Verify mocks work with actual imports before scaling

### **4. Success Validation Protocol**
1. **Single Component Test**: Choose simplest component, verify it renders
2. **Complex Import Test**: Choose component with most imports, verify resolution
3. **Native Module Test**: Choose component using Expo/native modules, verify mocks
4. **Only proceed if ALL THREE pass without errors**

---

## 🎯 **Phase 2: Business Requirements Analysis (20% of time)**

### **5. Business Rule Discovery (MANDATORY)**
- **"What are the actual business requirements this app implements?"**
  - Read requirements documents, user stories, acceptance criteria
  - Interview product owners, designers, stakeholders
  - Map user workflows and business processes
  - Identify validation rules, constraints, and edge cases

### **6. Feature-Specific Business Logic Inventory**
For each feature/screen, identify:
- **Input validation rules** (character limits, format requirements, required fields)
- **Business calculations** (pricing, scoring, transformations)
- **Workflow constraints** (step ordering, prerequisites, error conditions)
- **Data relationships** (how different pieces of data interact)
- **User permission rules** (who can do what, when)
- **Performance requirements** (response times, loading thresholds)

### **7. Critical Business Scenarios Mapping**
- **Happy path workflows** (normal user success scenarios)
- **Error conditions** (network failures, invalid input, edge cases)
- **Boundary conditions** (min/max values, empty states, full states)
- **Security rules** (authentication, authorization, data protection)
- **Accessibility requirements** (screen reader support, keyboard navigation)

---

## 📋 **Phase 3: Comprehensive Test Planning (20% of time)**

### **8. Test Category Coverage Matrix**

#### **A. Business Logic Tests (40% of total tests)**
- **Validation Functions**: Input validation, format checking, constraint enforcement
- **Calculation Logic**: Mathematical operations, transformations, aggregations
- **Workflow Logic**: State transitions, step ordering, conditional branching
- **Business Rules**: Policy enforcement, compliance checks, approval workflows

#### **B. Integration Tests (25% of total tests)**
- **Component Integration**: How components work together within features
- **Data Flow**: State management, prop drilling, context usage
- **API Integration**: Data fetching, error handling, loading states
- **Navigation Flows**: Screen transitions, route handling, deep linking

#### **C. User Interaction Tests (20% of total tests)**
- **Event Handling**: Press, swipe, scroll, input interactions
- **Form Workflows**: Multi-step forms, validation feedback, submission flows
- **Animation Interactions**: Touch responses, gesture handling, timing
- **Accessibility Interactions**: Screen reader, keyboard navigation, focus management

#### **D. Edge Case Tests (10% of total tests)**
- **Error Scenarios**: Network failures, API errors, timeout handling
- **Boundary Conditions**: Empty lists, maximum values, overflow scenarios
- **Device Variations**: Different screen sizes, orientations, platform differences
- **Performance Limits**: Large datasets, memory constraints, slow devices

#### **E. Component Contract Tests (5% of total tests)**
- **Interface Verification**: Props validation, required vs optional parameters
- **Rendering Verification**: Component renders without crashing
- **Basic Interaction**: Components respond to basic events

### **9. Test Implementation Strategy**

#### **Test Naming Convention:**
```typescript
// Format: [Feature]_[BusinessRule]_[Scenario]_[ExpectedOutcome]
describe('TextProcessor_CharacterLimit_ExceedsMaximum_ShowsValidationError', () => {
  it('displays error when input exceeds 1000 characters', () => {
    // Business rule test implementation
  });
});
```

#### **Test Organization:**
```
tests/
├── business-logic/           # Pure business rule tests
│   ├── validation/
│   ├── calculations/
│   └── workflows/
├── integration/              # Component integration tests
│   ├── features/
│   ├── data-flow/
│   └── navigation/
├── user-interactions/        # User behavior tests
│   ├── forms/
│   ├── gestures/
│   └── accessibility/
├── edge-cases/              # Error and boundary tests
│   ├── errors/
│   ├── boundaries/
│   └── performance/
└── contracts/               # Component interface tests
    ├── components/
    └── hooks/
```

---

## 🔄 **Phase 4: Test Implementation (50% of time)**

### **10. Business Logic Test Examples**

```typescript
// BUSINESS RULE TEST (HIGH VALUE)
describe('AI Text Processing Business Rules', () => {
  it('enforces 1000 character limit for processing input', () => {
    const processor = new TextProcessor();
    const longText = 'a'.repeat(1001);
    
    const result = processor.validateInput(longText);
    
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Text exceeds maximum length of 1000 characters');
  });

  it('calculates processing cost based on text complexity', () => {
    const processor = new TextProcessor();
    const complexText = 'Text with émojis 🚀 and spëcial chars';
    
    const cost = processor.calculateProcessingCost(complexText);
    
    expect(cost).toBeGreaterThan(1.0); // Complex text costs more
    expect(cost).toBeLessThan(2.0);    // But within reasonable bounds
  });
});

// WORKFLOW TEST (HIGH VALUE)
describe('Liquid Glass Interaction Workflow', () => {
  it('prevents new ripples when animation quota exceeded', () => {
    const rippleManager = new RippleManager();
    
    // Create maximum allowed ripples
    for (let i = 0; i < MAX_CONCURRENT_RIPPLES; i++) {
      rippleManager.createRipple(i * 10, i * 10);
    }
    
    // Attempt to create one more
    const result = rippleManager.createRipple(100, 100);
    
    expect(result.success).toBe(false);
    expect(result.reason).toBe('Maximum concurrent ripples reached');
  });
});

// INTEGRATION TEST (HIGH VALUE)
describe('Feature Discovery Navigation', () => {
  it('updates breadcrumb trail when navigating feature categories', () => {
    const { getByText, getByTestId } = render(<ExploreScreen />);
    
    fireEvent.press(getByText('AI Features'));
    fireEvent.press(getByText('Text Processing'));
    
    const breadcrumb = getByTestId('breadcrumb-trail');
    expect(breadcrumb).toHaveTextContent('Explore > AI Features > Text Processing');
  });
});
```

### **11. Coverage Validation**

#### **Business Rule Coverage Checklist:**
- [ ] All input validation rules tested
- [ ] All business calculations tested  
- [ ] All workflow state transitions tested
- [ ] All error conditions tested
- [ ] All user permission scenarios tested
- [ ] All performance requirements validated

#### **User Journey Coverage:**
- [ ] All primary user workflows tested end-to-end
- [ ] All error recovery paths tested
- [ ] All accessibility flows tested
- [ ] All device/platform variations tested

#### **Quality Metrics:**
- **Business Logic Coverage**: >90% of business rules have tests
- **User Journey Coverage**: >95% of critical user paths tested
- **Edge Case Coverage**: >80% of error scenarios covered
- **Performance Coverage**: All performance requirements validated

---

## 📊 **Success Metrics for Comprehensive Test Suite**

### **Quantitative Metrics:**
- **Test Count**: 100-200 tests for medium complexity app
- **Business Logic Tests**: 40-60 tests (core value)
- **Integration Tests**: 25-40 tests (feature interactions)
- **User Interaction Tests**: 20-30 tests (user experience)
- **Edge Case Tests**: 10-15 tests (error handling)
- **Component Contract Tests**: 5-10 tests (technical verification)

### **Qualitative Metrics:**
- ✅ **Product Owner Confidence**: "I trust this code implements our requirements"
- ✅ **Developer Confidence**: "I can refactor without breaking business logic"
- ✅ **User Experience Validation**: "Critical user journeys are protected"
- ✅ **Maintainability**: "Tests document business requirements clearly"

---

## 🚨 **Red Flags: What NOT to Call "Comprehensive"**

### **Anti-Patterns to Avoid:**
- **"Renders without crashing" tests** → Provides zero business value
- **"Props are passed correctly" tests** → Tests implementation, not requirements
- **"Mock function called" tests** → Tests test code, not business code
- **High code coverage, low business coverage** → Missing the point entirely

### **Common Incomplete Test Suites:**
- **43 shallow tests** → Only component contracts tested
- **No business rule validation** → App could be completely wrong and tests pass
- **No user workflow testing** → Features work in isolation but not together
- **No error scenario testing** → App breaks under real-world conditions

---

## 💡 **The Business Value Rule**

> **"Every test should validate a business requirement, user need, or critical error condition. If a test doesn't protect business value, it doesn't belong in a comprehensive test suite."**

---

## 🎯 **Comprehensive Test Suite Definition**

A developer can claim they created a comprehensive test suite when:

1. **Business Requirements**: Every business rule has a corresponding test
2. **User Journeys**: Every critical user workflow is tested end-to-end  
3. **Error Handling**: Every error condition has a recovery test
4. **Edge Cases**: Boundary conditions and performance limits are validated
5. **Integration**: Features work together as designed
6. **Maintainability**: Tests serve as living documentation of requirements
7. **Confidence**: Product team trusts the test suite to catch regressions

**Without these elements, you have a "partial test suite" regardless of test count.**

---

*This guide ensures test suites provide real business protection, not just technical validation.*