<template>
  <div class="App">
    <header class="App__header">
      <address>
        <strong>{{ client.Name }}</strong><br>
        {{ client[`Contact Person`] }}<br>
        {{ client.Street }}<br>
        {{ client.Zip }} {{ client.Town }}
      </address>

      <address class="App__personal-address">
        Markus Oberlehner |
        Main Street 10, 1234 Nice Town |
        +43 670 206 3117 |
        markus.oberlehner@gmail.com
      </address>
    </header>

    <main class="App__main">
      <div class="App__town-and-date">
        Nice Town, {{ invoice.Date }}
      </div>

      <h1 class="App__headline">Invoice Nr. {{ invoice[`Invoice ID`] }}</h1>

      <div class="App__tasks tasks">
        <div class="tasks__row tasks__row--head">
          <div class="tasks__column tasks__column--task">
            Task
          </div>
          <div class="tasks__column tasks__column--number tasks__column--rate">
            Rate
          </div>
          <div class="tasks__column tasks__column--number tasks__column--hours">
            Hours
          </div>
          <div class="tasks__column tasks__column--number tasks__column--total">
            Total
          </div>
        </div>
        <div
          v-for="task in tasks"
          :key="task.Name"
          class="task tasks__row"
        >
          <div class="tasks__column tasks__column--task">
            <h2 class="task__headline">{{ task.Name }}</h2>
            <p class="task__body">{{ task.Description }}</p>
          </div>
          <div class="tasks__column tasks__column--number tasks__column--rate">
            € {{ task[`Hourly Rate`][0] }}
          </div>
          <div class="tasks__column tasks__column--number tasks__column--hours">
            {{ task[`Billable Hours`] }}
          </div>
          <div class="tasks__column tasks__column--number tasks__column--total">
            € {{ task.Cost }}
          </div>
        </div>
        <div class="tasks__row tasks__row--foot">
          <div class="tasks__column tasks__column--number">
            <strong>Total € {{ invoice.Total }}</strong>
          </div>
        </div>
      </div>
    </main>

    <footer class="App__footer">
      Best Regards<br>
      Markus Oberlehner
    </footer>

    <div
      v-if="loaded"
      id="loaded"
    />
  </div>
</template>

<script>
import { find as findClient } from './services/client';
import { find as findTask } from './services/task';
import { findByInvoiceId as findInvoiceByInvoiceId } from './services/invoice';

export default {
  name: `App`,
  data() {
    return {
      client: {},
      invoice: {},
      loaded: false,
      tasks: [],
    };
  },
  created() {
    this.fetchInvoiceData();
  },
  methods: {
    async fetchInvoiceData() {
      // Get the invoice ID from the URL.
      const url = new URL(window.location.href);
      const invoiceId = url.searchParams.get(`invoiceId`);

      const invoice = await findInvoiceByInvoiceId(invoiceId);
      this.invoice = invoice.fields;

      const [client, tasks] = await Promise.all([
        findClient(this.invoice.Client[0]),
        Promise.all(invoice.fields.Tasks.map(id => findTask(id))),
      ]);

      this.client = client.fields;
      this.tasks = tasks.map(x => x.fields);
      this.loaded = true;
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/settings/**/*';
@import './assets/scss/generic/**/*';

$vertical-page-spacing: 1.5cm;
$horizontal-page-spacing: 2cm;
$theme-color: #00acc1;
$theme-contrast-color: #fff;

@page {
  margin: $vertical-page-spacing 0;
}

@page :first {
  margin: 0 0 $vertical-page-spacing 0;
}

.App__header {
  padding: setting-spacing(xxl) $horizontal-page-spacing setting-spacing(xl);
  background-color: $theme-color;
  color: $theme-contrast-color;
}

.App__personal-address {
  margin-top: setting-spacing(xl);
}

.App__main {
  padding: setting-spacing(xxxl) $horizontal-page-spacing;
}

.App__town-and-date {
  text-align: right;
}

.App__headline {
  margin-top: setting-spacing(xl, true);
  font-size: 2.5em;
  font-weight: 700;
}

.App__tasks {
  margin-top: setting-spacing(xxl);
}

.App__footer {
  padding-right: $horizontal-page-spacing;
  padding-left: $horizontal-page-spacing;
}

.tasks__row {
  display: flex;
  page-break-inside: avoid;

  &:not(:first-child) {
    margin-top: setting-spacing(l);
  }
}

.tasks__row--head {
  padding-bottom: setting-spacing(s);
  color: #666;
  border-bottom: 2px solid #efefef;
}

.tasks__row--foot {
  padding-top: setting-spacing(s);
  border-top: 2px solid #efefef;
}

.tasks__column {
  flex-grow: 1;
}

.tasks__column--task {
  width: 70%;
}

.tasks__column--rate {
  width: 10%;
}

.tasks__column--hours {
  width: 10%;
}

.tasks__column--total {
  width: 10%;
}

.tasks__column--number {
  text-align: right;
}

.task__headline {
  font-weight: 700;
}
</style>
