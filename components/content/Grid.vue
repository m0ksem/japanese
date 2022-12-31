<template>
  <table class="example-table">
    <tr v-for="row in table">
      <td v-for="col in row" :colspan="col.colspan">
        {{ col.content }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import type { Slot } from "vue";

const { slots } = getCurrentInstance()!;

const getDefaultSlotText = (slot: Slot): string => {
  const c = slot()[0].children;
  if (typeof c === "string") {
    return c;
  }

  if (typeof c === "object") {
    return getDefaultSlotText((c as any).default);
  }

  throw new Error("");
};

const table = computed(() => {
  const text = getDefaultSlotText(slots.default!);

  const rows = text.split("\n");
  const table = rows.map((c) => c.split("|").filter(Boolean));

  const withColSpans = table.map((row) => {
    return row.map((col, colIndex) => ({
      content: col.trim(),
      colspan: col.length + 1, // +1 cuz "|" was removed 
    }))
  })

  const maxRowLength = rows.reduce((acc, r) => Math.max(r.length, acc), 0)

  withColSpans.forEach((row, rowIndex) => {
    const colspanSum = row.slice(0, -1).reduce((acc, c) => acc + c.colspan, 0)
    row[row.length - 1].colspan = maxRowLength - colspanSum
  })

  return withColSpans
});
</script>

<style lang="scss" scoped>
.example-table {
  --border: 1px solid rgba(0, 0, 0, 0.281);

  border-spacing: 0;
  border: var(--border);

  td {
    padding: 4px;
    box-sizing: border-box;
    border-right: var(--border);
    border-bottom: var(--border);
    &:last-child {
      border-right: 0;
    }
    text-align: center;
  }

  tr:last-child {
    td {
      border-bottom: 0;
    }
  }
}
</style>
