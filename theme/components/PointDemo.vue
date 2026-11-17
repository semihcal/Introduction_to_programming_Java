<script setup lang="ts">
// A Point object with private members x and y. The buttons are the only
// ways in: a constructor, accessors and mutators. Touching p.x directly
// is refused, as the compiler would refuse it.
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('point', {
  x: 3,
  y: 4,
  out: 'Point p = new Point(3, 4);   // the constructor set x and y',
  kind: 'ok' as 'ok' | 'error',
  touched: '' as '' | 'x' | 'y',
})

function run(code: string, result: string, touched: '' | 'x' | 'y' = '', kind: 'ok' | 'error' = 'ok') {
  s.out = `${code}   // ${result}`
  s.touched = touched
  s.kind = kind
}
function construct() {
  s.x = 3
  s.y = 4
  run('p = new Point(3, 4);', 'the constructor set x and y')
}
function getX() {
  run('p.getX();', `accessor: returns ${s.x}`, 'x')
}
function getY() {
  run('p.getY();', `accessor: returns ${s.y}`, 'y')
}
function setX() {
  s.x += 5
  run(`p.setX(${s.x});`, `mutator: x is now ${s.x}`, 'x')
}
function setY() {
  s.y += 5
  run(`p.setY(${s.y});`, `mutator: y is now ${s.y}`, 'y')
}
function direct() {
  run('p.x = 10;', 'compile error: x has private access in Point', '', 'error')
}
</script>

<template>
  <div class="pd" @keydown.stop>
    <div class="pd-buttons">
      <button type="button" class="ghost" @click="construct">
        new Point(3, 4)
      </button>
      <button type="button" @click="getX">
        p.getX()
      </button>
      <button type="button" @click="getY">
        p.getY()
      </button>
      <button type="button" @click="setX">
        p.setX(x + 5)
      </button>
      <button type="button" @click="setY">
        p.setY(y + 5)
      </button>
      <button type="button" class="bad" @click="direct">
        p.x = 10
      </button>
    </div>

    <div class="pd-main">
      <div class="pd-object" role="img" :aria-label="`A Point object. Its private members are x = ${s.x} and y = ${s.y}. Its public methods are getX, getY, setX and setY.`">
        <div class="pd-title">
          Point object
        </div>
        <div class="pd-private">
          <div class="pd-cap">
            private members
          </div>
          <div class="pd-members">
            <div class="pd-member" :class="{ on: s.touched === 'x' }">
              <span>x</span><b>{{ s.x }}</b>
            </div>
            <div class="pd-member" :class="{ on: s.touched === 'y' }">
              <span>y</span><b>{{ s.y }}</b>
            </div>
          </div>
        </div>
        <div class="pd-cap">
          public methods: getX() · getY() · setX() · setY()
        </div>
      </div>

      <div class="pd-out" :class="s.kind" aria-live="polite">
        <div class="pd-cap">
          {{ s.kind === 'error' ? 'Refused by the compiler' : 'Last statement' }}
        </div>
        <code>{{ s.out }}</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pd {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pd-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pd-buttons button {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 10px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  cursor: pointer;
}
.pd-buttons button.ghost {
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
}
.pd-buttons button.bad {
  border: 2px dashed var(--c-accent-2, #c2410c);
  background: var(--c-paper, #fff);
  color: var(--c-accent-2, #c2410c);
}
.pd-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: center;
}
.pd-object {
  padding: 12px 16px 14px;
  border-radius: 16px;
  border: 3px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.pd-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
}
.pd-private {
  padding: 8px 12px 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: 3px dashed var(--c-ink, #0f172a);
  background: #ffffff;
}
.pd-cap {
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.pd-members {
  display: flex;
  gap: 12px;
  margin-top: 6px;
}
.pd-member {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 14px;
  border-radius: 10px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 24px;
}
.pd-member.on {
  border-width: 6px;
  padding: 3px 11px;
}
.pd-out {
  padding: 12px 16px;
  border-radius: 14px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
}
.pd-out.error {
  border: 3px dashed var(--c-accent-2, #c2410c);
}
.pd-out code {
  display: block;
  margin-top: 6px;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 19px !important;
  font-weight: 700;
  line-height: 1.45;
  background: none !important;
  color: var(--c-ink, #0f172a) !important;
  padding: 0 !important;
  white-space: normal;
}
</style>
