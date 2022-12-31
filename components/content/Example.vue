<template>
  <table class="example-table">
    <tr v-for="row in table">
      <td v-for="col in row" :colspan="col.colSpan">
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

const fullfilTable = <T>(table: T[][], emptyValue: T) => {
  const maxCol = table.reduce((acc, row) => Math.max(acc, row.length), 0);

  table.forEach((row) => {
    const diff = maxCol - row.length;
    for (let i = 0; i < diff; i++) {
      row.push(emptyValue);
    }
  });
  return table
}

const table = computed(() => {
  const text = getDefaultSlotText(slots.default!);

  const rows = text.split("\n");
  const table = rows.map((c) => c.split("|").filter(Boolean));

  const colSpans = [] as number[]

  table.forEach((row, rowIndex) => {
    if (![1, 2].includes(rowIndex)) { return }

    const newRow = [] as string[]
    row.forEach((col, colIndex) => {
      const newCols = col.trim().split(' ')
      colSpans[colIndex] = newCols.length
      newRow.push(...newCols)
    })
    table[rowIndex] = newRow
  })

  const newTable = table.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      if ([1, 2].includes(rowIndex)) { 
        return {
          content: col,
          colSpan: 1,
        }
      }

      return {
        content: col,
        colSpan: colSpans[colIndex]!
      }
    })
  })

  const getRowLength = (row: any) => row.reduce((acc: number, c: any) => acc + (1 * c.colSpan), 0)

  const maxCol = newTable.reduce((acc, row) => Math.max(acc, getRowLength(row)), 0);

  newTable.forEach((row) => {
    const diff = maxCol - getRowLength(row);
    for (let i = 0; i < diff; i++) {
      row.push({ content: '', colSpan: 1 });
    }
  });

  return newTable
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
