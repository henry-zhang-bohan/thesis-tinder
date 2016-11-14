# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161114180005) do

  create_table "departments", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "keywords", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "professor_keywords", force: :cascade do |t|
    t.integer  "professor_id"
    t.integer  "keyword_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["keyword_id"], name: "index_professor_keywords_on_keyword_id"
    t.index ["professor_id"], name: "index_professor_keywords_on_professor_id"
  end

  create_table "professor_skills", force: :cascade do |t|
    t.integer  "professor_id"
    t.integer  "skill_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["professor_id"], name: "index_professor_skills_on_professor_id"
    t.index ["skill_id"], name: "index_professor_skills_on_skill_id"
  end

  create_table "professor_topics", force: :cascade do |t|
    t.integer  "professor_id"
    t.integer  "topic_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["professor_id"], name: "index_professor_topics_on_professor_id"
    t.index ["topic_id"], name: "index_professor_topics_on_topic_id"
  end

  create_table "professors", force: :cascade do |t|
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "link"
    t.string   "photo"
    t.text     "courses"
    t.text     "likes"
    t.text     "hides"
    t.text     "bio"
    t.integer  "department_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["department_id"], name: "index_professors_on_department_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "student_keywords", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "keyword_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["keyword_id"], name: "index_student_keywords_on_keyword_id"
    t.index ["student_id"], name: "index_student_keywords_on_student_id"
  end

  create_table "student_skills", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_id"], name: "index_student_skills_on_skill_id"
    t.index ["student_id"], name: "index_student_skills_on_student_id"
  end

  create_table "student_topics", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "topic_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_id"], name: "index_student_topics_on_student_id"
    t.index ["topic_id"], name: "index_student_topics_on_topic_id"
  end

  create_table "students", force: :cascade do |t|
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "link"
    t.string   "photo"
    t.text     "courses"
    t.text     "likes"
    t.text     "hides"
    t.text     "bio"
    t.integer  "department_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["department_id"], name: "index_students_on_department_id"
  end

  create_table "topic_keywords", force: :cascade do |t|
    t.integer  "topic_id"
    t.integer  "keyword_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["keyword_id"], name: "index_topic_keywords_on_keyword_id"
    t.index ["topic_id"], name: "index_topic_keywords_on_topic_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
