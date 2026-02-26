# How to Use the API Mapper (Once It's Built)

Simple steps so you can understand and test the flow.

---

## Where is it?

- **Live UI:** https://be-api-generator.onrender.com/ui  
- **API docs:** https://be-api-generator.onrender.com/docs  
- **Branch:** `feature/be-api-generator` (or `feature/api-mapper-ui`)

---

## What you see (3 steps)

### Step 1: Pick a "TS Answer" (left side)

- You see a list of **Saved Answers** (e.g. "Monthly Pipeline Health Report", "Clinical Trial Milestones").
- **Click one.**
- The table on the right (**API Mapper**) fills with rows:
  - **Select** rows = columns that will be in the API response.
  - **Where** rows = parameters the user/frontend will send (e.g. project_key, date_key).

So: **one TS Answer = one SQL**. Picking it loads the mapping from that SQL.

---

### Step 2: Edit the table (optional) and click **Generate**

- You can change:
  - **Response Field Name** – name in the JSON response.
  - **Is required in Response** – Y/N for Select columns.
  - **User Input Required** – for Where: Y = "this is an API parameter".
- Then click the blue **Generate** button.

You get three things (tabs below the button):

1. **SQL View** – the SQL that will be run.
2. **Sample Data** – example rows (so you see what the API returns).
3. **API SQL Code Template** – the "recipe" the backend uses when someone calls the API with parameters.

So: **Configure → Generate → See SQL + sample + template.**

---

### Step 3: Screen 2 – Property & Description

- Click **"Screen 2: Property & Description"** at the top.
- Same table style: **Property**, **Description**, **Value**, **Notes**.
- Here you define: Method (GET), Version, API Name, Full API Call, Description, Swagger Update, Response JSON Schema/Sample, Sample Data, API SQL Code Template.
- After you’ve clicked Generate on Screen 1, **Sample Data** and **API SQL Code Template** on this screen are filled from that output.

So: **Define how the API looks (method, name, schema, etc.) in the same table UI.**

---

## Flow in one line

**Pick answer → Table fills → (Edit if you want) → Generate → See SQL + sample + template → Go to Screen 2 to define API properties.**

---

## Test it now

1. Open: **https://be-api-generator.onrender.com/ui**
2. Click any item in the left list (e.g. "Monthly Pipeline Health Report").
3. See the API Mapper table fill.
4. Click **Generate**.
5. Open the tabs: **SQL View**, **Sample Data**, **API SQL Code Template**.
6. Click **"Screen 2: Property & Description"** and look at the table.

That’s the full flow. Once it’s built and deployed, this is how you use it.
