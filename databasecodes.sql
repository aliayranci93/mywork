--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-08-14 15:04:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16638)
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    "name " text,
    job text,
    phone text
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16643)
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO postgres;

--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 215
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- TOC entry 216 (class 1259 OID 16644)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    task_id integer NOT NULL,
    email text NOT NULL,
    description text,
    "time" timestamp without time zone NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16649)
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO postgres;

--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 217
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.id;


--
-- TOC entry 218 (class 1259 OID 16650)
-- Name: contactpeople; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contactpeople (
    name text NOT NULL,
    email text,
    phonenumber text NOT NULL,
    message text,
    id integer NOT NULL
);


ALTER TABLE public.contactpeople OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16655)
-- Name: contactpeople_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contactpeople_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contactpeople_id_seq OWNER TO postgres;

--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 219
-- Name: contactpeople_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contactpeople_id_seq OWNED BY public.contactpeople.id;


--
-- TOC entry 220 (class 1259 OID 16656)
-- Name: forgetpasswordhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forgetpasswordhistory (
    creationtime timestamp with time zone,
    code text,
    mail text
);


ALTER TABLE public.forgetpasswordhistory OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16661)
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    title text,
    creationtime timestamp with time zone,
    author text,
    description text,
    image text,
    category_id integer,
    tag text,
    id integer NOT NULL
);


ALTER TABLE public.news OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16666)
-- Name: news_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news_category (
    name text,
    id integer NOT NULL
);


ALTER TABLE public.news_category OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16671)
-- Name: news_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_category_id_seq OWNER TO postgres;

--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 223
-- Name: news_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_category_id_seq OWNED BY public.news_category.id;


--
-- TOC entry 224 (class 1259 OID 16672)
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_id_seq OWNER TO postgres;

--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 224
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- TOC entry 225 (class 1259 OID 16673)
-- Name: priorities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.priorities (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.priorities OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16678)
-- Name: priorities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.priorities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.priorities_id_seq OWNER TO postgres;

--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 226
-- Name: priorities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.priorities_id_seq OWNED BY public.priorities.id;


--
-- TOC entry 227 (class 1259 OID 16679)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name text NOT NULL,
    key text
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16684)
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO postgres;

--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 228
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- TOC entry 229 (class 1259 OID 16685)
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    subheading text,
    phone text,
    fax text,
    email text,
    map text,
    id integer DEFAULT 1
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16691)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    updated_by integer
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16696)
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_id_seq OWNER TO postgres;

--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 231
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- TOC entry 232 (class 1259 OID 16697)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    priority_id integer NOT NULL,
    status_id integer NOT NULL,
    assignee_acc_id integer NOT NULL,
    project_id integer NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16702)
-- Name: todo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_id_seq OWNER TO postgres;

--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 233
-- Name: todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.todo_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 234 (class 1259 OID 16703)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    email text NOT NULL,
    key text,
    refresh_token text,
    id integer NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 24724)
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO postgres;

--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 235
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- TOC entry 3226 (class 2604 OID 16708)
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 16709)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 16710)
-- Name: contactpeople id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactpeople ALTER COLUMN id SET DEFAULT nextval('public.contactpeople_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 16711)
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 16712)
-- Name: news_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_category ALTER COLUMN id SET DEFAULT nextval('public.news_category_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 16713)
-- Name: priorities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.priorities ALTER COLUMN id SET DEFAULT nextval('public.priorities_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 16714)
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 16715)
-- Name: status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 16716)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 24725)
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- TOC entry 3406 (class 0 OID 16638)
-- Dependencies: 214
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.accounts (id, email, password, role, "name ", job, phone) VALUES (1, 'hikmetberkin@gmail.com', '7806', 'Basic', 'berkin', 'manager', NULL);
INSERT INTO public.accounts (id, email, password, role, "name ", job, phone) VALUES (3, 'admin', 'root', 'Admin', 'kaan', 'employee', NULL);
INSERT INTO public.accounts (id, email, password, role, "name ", job, phone) VALUES (4, 'selinnn@gmail.com', '1234', 'Basic', 'selin', 'employee', NULL);
INSERT INTO public.accounts (id, email, password, role, "name ", job, phone) VALUES (8, 'dmlattr@gmail.com', '1234', 'Basic', 'damla', 'employee', NULL);
INSERT INTO public.accounts (id, email, password, role, "name ", job, phone) VALUES (9, 'mislinasırac@gmail.com', '123', 'Basic', 'mislina', 'employee', NULL);
INSERT INTO public.accounts (id, email, password, role, "name ", job, phone) VALUES (10, 'ecebeyhan@gmail.com', 'ece123', 'Basic', 'ece', 'employee', NULL);


--
-- TOC entry 3408 (class 0 OID 16644)
-- Dependencies: 216
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments (id, task_id, email, description, "time") VALUES (1, 3, 'hikmetberkin@gmail.com', 'Dneme yorumu', '2023-07-18 14:10:02.894');
INSERT INTO public.comments (id, task_id, email, description, "time") VALUES (2, 3, 'hikmetberkin@gmail.com', 'Dneme yorumu2', '2023-07-18 14:10:11.568');
INSERT INTO public.comments (id, task_id, email, description, "time") VALUES (3, 3, 'hikmetberkin@gmail.com', 'Dneme yorumu2', '2023-07-18 14:10:58.425');


--
-- TOC entry 3410 (class 0 OID 16650)
-- Dependencies: 218
-- Data for Name: contactpeople; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contactpeople (name, email, phonenumber, message, id) VALUES ('Ece', 'ecebeyhan@gmail.com', '53598755654', 'Please contact me.', 1);
INSERT INTO public.contactpeople (name, email, phonenumber, message, id) VALUES ('Emre', '', '53598755654', 'Please contact me.', 2);
INSERT INTO public.contactpeople (name, email, phonenumber, message, id) VALUES ('Emre', '', '', 'Please contact me.', 3);
INSERT INTO public.contactpeople (name, email, phonenumber, message, id) VALUES ('Ayşe', '', '123', 'Please contact me.', 4);
INSERT INTO public.contactpeople (name, email, phonenumber, message, id) VALUES ('Ayse', 'ayse@gmail.com', '', 'Please contact me.', 5);
INSERT INTO public.contactpeople (name, email, phonenumber, message, id) VALUES ('mehmet', 'mehmet@gmail.com', '', 'Please contact me.', 6);
INSERT INTO public.contactpeople (name, email, phonenumber, message, id) VALUES ('john', 'john@gmail.com', '12', 'Please.', 7);
INSERT INTO public.contactpeople (name, email, phonenumber, message, id) VALUES ('emily', 'emily@gmail.com', '12', 'Please.', 8);


--
-- TOC entry 3412 (class 0 OID 16656)
-- Dependencies: 220
-- Data for Name: forgetpasswordhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3413 (class 0 OID 16661)
-- Dependencies: 221
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news (title, creationtime, author, description, image, category_id, tag, id) VALUES ('abc', '2023-08-02 11:25:16.362+03', 'ece beyhan', NULL, NULL, NULL, NULL, 1);
INSERT INTO public.news (title, creationtime, author, description, image, category_id, tag, id) VALUES ('a car accident happened', '2023-08-02 11:26:06.108+03', 'emre beyhan', NULL, NULL, NULL, NULL, 2);
INSERT INTO public.news (title, creationtime, author, description, image, category_id, tag, id) VALUES ('companies held meeting', '2023-08-02 11:39:39.148+03', 'ece beyhan', NULL, NULL, NULL, NULL, 3);
INSERT INTO public.news (title, creationtime, author, description, image, category_id, tag, id) VALUES ('cde', '2023-08-02 11:42:28.35+03', 'ece', NULL, NULL, NULL, NULL, 4);
INSERT INTO public.news (title, creationtime, author, description, image, category_id, tag, id) VALUES ('def', '2023-08-02 11:42:36.486+03', 'ece', NULL, NULL, NULL, NULL, 5);


--
-- TOC entry 3414 (class 0 OID 16666)
-- Dependencies: 222
-- Data for Name: news_category; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3417 (class 0 OID 16673)
-- Dependencies: 225
-- Data for Name: priorities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.priorities (id, name) VALUES (2, 'High');
INSERT INTO public.priorities (id, name) VALUES (3, 'Medium');
INSERT INTO public.priorities (id, name) VALUES (4, 'Low');
INSERT INTO public.priorities (id, name) VALUES (5, 'Lowest');


--
-- TOC entry 3419 (class 0 OID 16679)
-- Dependencies: 227
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projects (id, name, key) VALUES (1, 'ihracat', 'dyop-ihracat');
INSERT INTO public.projects (id, name, key) VALUES (2, 'ithalat', '1010');
INSERT INTO public.projects (id, name, key) VALUES (5, 'ihracat', '1010');
INSERT INTO public.projects (id, name, key) VALUES (4, 'ithalat', '1010');


--
-- TOC entry 3421 (class 0 OID 16685)
-- Dependencies: 229
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.settings (subheading, phone, fax, email, map, id) VALUES ('You can enter your name, email, phone number and message to contact us.', '234', '3124405841', 'cybersoft@cybersoft.com.tr', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3062.2107033415373!2d32.743774!3d39.869518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f806ea004ff%3A0x568e435f2c9c4a74!2sCybersoft!5e0!3m2!1str!2str!4v1690542551014!5m2!1str!2str', 1);


--
-- TOC entry 3422 (class 0 OID 16691)
-- Dependencies: 230
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.status (id, name, created_at, updated_at, updated_by) VALUES (1, 'meraba', '2023-08-03 11:23:54+03', '2023-08-10 21:26:33+03', 3);
INSERT INTO public.status (id, name, created_at, updated_at, updated_by) VALUES (7, 'resolved
', '2023-08-03 11:23:54+03', '2023-08-03 11:23:54+03', 3);
INSERT INTO public.status (id, name, created_at, updated_at, updated_by) VALUES (28, 'todos', '2023-08-09 05:54:34+03', '2023-08-09 05:54:34+03', 3);
INSERT INTO public.status (id, name, created_at, updated_at, updated_by) VALUES (30, 'todosav', '2023-08-09 05:54:57+03', '2023-08-09 05:54:57+03', 3);
INSERT INTO public.status (id, name, created_at, updated_at, updated_by) VALUES (32, 'todosavbimbn', '2023-08-09 05:56:18+03', '2023-08-09 05:56:18+03', 3);
INSERT INTO public.status (id, name, created_at, updated_at, updated_by) VALUES (33, 'todosavbimbsssn', '2023-08-09 05:56:27+03', '2023-08-09 05:56:27+03', 3);
INSERT INTO public.status (id, name, created_at, updated_at, updated_by) VALUES (34, 'todosavbimbssy8ysn', '2023-08-10 16:55:02+03', '2023-08-10 16:55:02+03', 3);


--
-- TOC entry 3424 (class 0 OID 16697)
-- Dependencies: 232
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tasks (id, title, description, created_at, updated_at, priority_id, status_id, assignee_acc_id, project_id) VALUES (13807, '[IHRACAT-511] ŞSA-İleri Teknoloji Kredi Faiz ', 'ŞSA-İleri Teknoloji Kredi Faiz Destek Ödeme Başvurusu', '2023-06-21 12:27:18+03', '2023-07-13 16:30:19+03', 1, 30, 1, 1);


--
-- TOC entry 3426 (class 0 OID 16703)
-- Dependencies: 234
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tokens (email, key, refresh_token, id) VALUES ('ahmetk@gmail.com', NULL, NULL, 2);
INSERT INTO public.tokens (email, key, refresh_token, id) VALUES ('deneme', '046f254c85cd1f92d61f6aafe20e435e1e6fa8b95399a37f09ceaec4bf848b6f', NULL, 3);
INSERT INTO public.tokens (email, key, refresh_token, id) VALUES ('hikmetberkin@gmail.com', '8665044eed87e9f5d4debfc9578e9f374d3e513138781431d979988c6c123f0b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhpa21ldGJlcmtpbkBnbWFpbC5jb20iLCJpYXQiOjE2OTE1Nzk4MzEsImV4cCI6MTY5MTY2NjIzMX0.1TGRCRDbU-DU3vrBJLQFWllIj81nO2sPoxu80r5I1cY', 5);
INSERT INTO public.tokens (email, key, refresh_token, id) VALUES ('sa', '7d2b60c3dab4b051cbd171dca4524e4d587b35bc36432eacd254b1de37299db6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhIiwiaWF0IjoxNjkxNzUxMDUzLCJleHAiOjE2OTE4Mzc0NTN9.heJa1CzcJ6Tefub9JT6EdE0amlZTa_2VW04RcL6lwqs', 1);
INSERT INTO public.tokens (email, key, refresh_token, id) VALUES ('admin', '517b9de9dafc538e8d16f8fc8ecd95cb2fa035d4568a689d1b2b36d83c531ce8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjkxOTYxNDk1LCJleHAiOjE2OTIwNDc4OTV9.6sRLJAvLk8yPlc_R9qxad_O-jk1d_3oo2znsx2TxfCQ', 6);
INSERT INTO public.tokens (email, key, refresh_token, id) VALUES ('user', 'b64776cda939c8e5faf352c5b78f7538440ec913c7fb4e5de40e1fc66c451a5a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIiLCJpYXQiOjE2OTE5NjE4MzYsImV4cCI6MTY5MjA0ODIzNn0.qr0rq2Gvz1k0I0xohuFrcx0c9vcjkcVLCfGzI6EcCNI', 4);


--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 215
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 10, true);


--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 217
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 3, true);


--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 219
-- Name: contactpeople_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contactpeople_id_seq', 8, true);


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 223
-- Name: news_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_category_id_seq', 1, false);


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 224
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 5, true);


--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 226
-- Name: priorities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.priorities_id_seq', 5, true);


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 228
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 4, true);


--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 231
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 34, true);


--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 233
-- Name: todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todo_id_seq', 1, false);


--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 235
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 6, true);


--
-- TOC entry 3238 (class 2606 OID 16718)
-- Name: accounts accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- TOC entry 3240 (class 2606 OID 16720)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 16722)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3248 (class 2606 OID 24742)
-- Name: status name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT name UNIQUE (name) INCLUDE (name);


--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 3248
-- Name: CONSTRAINT name ON status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT name ON public.status IS '
';


--
-- TOC entry 3244 (class 2606 OID 16724)
-- Name: priorities priorities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.priorities
    ADD CONSTRAINT priorities_pkey PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 16726)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 16728)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 16730)
-- Name: tasks todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 16732)
-- Name: tokens tokens_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_email_key UNIQUE (email);


--
-- TOC entry 3256 (class 2606 OID 24727)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 16734)
-- Name: tokens tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_token_key UNIQUE (key);


--
-- TOC entry 3259 (class 2606 OID 16740)
-- Name: tasks assignee_acc_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT assignee_acc_fkey FOREIGN KEY (assignee_acc_id) REFERENCES public.accounts(id) NOT VALID;


--
-- TOC entry 3260 (class 2606 OID 16745)
-- Name: tasks priority_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT priority_fkey FOREIGN KEY (priority_id) REFERENCES public.priorities(id) NOT VALID;


--
-- TOC entry 3261 (class 2606 OID 16750)
-- Name: tasks project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT project_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) NOT VALID;


--
-- TOC entry 3262 (class 2606 OID 16755)
-- Name: tasks status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT status_fkey FOREIGN KEY (status_id) REFERENCES public.status(id) NOT VALID;


--
-- TOC entry 3263 (class 2606 OID 24736)
-- Name: tokens tokens_id_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_id_key FOREIGN KEY (id) REFERENCES public.accounts(id) NOT VALID;


-- Completed on 2023-08-14 15:04:24

--
-- PostgreSQL database dump complete
--

