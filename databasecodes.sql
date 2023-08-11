--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-08-11 14:57:15

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
-- TOC entry 235 (class 1259 OID 24820)
-- Name: about_us; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.about_us (
    text text,
    id integer NOT NULL
);


ALTER TABLE public.about_us OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 24825)
-- Name: about_us_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.about_us_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.about_us_id_seq OWNER TO postgres;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 236
-- Name: about_us_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.about_us_id_seq OWNED BY public.about_us.id;


--
-- TOC entry 214 (class 1259 OID 24629)
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
-- TOC entry 215 (class 1259 OID 24634)
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
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 215
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- TOC entry 216 (class 1259 OID 24635)
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
-- TOC entry 217 (class 1259 OID 24640)
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
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 217
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.id;


--
-- TOC entry 223 (class 1259 OID 24703)
-- Name: contactpeople; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contactpeople (
    name text,
    email text,
    phonenumber text,
    message text,
    id integer NOT NULL
);


ALTER TABLE public.contactpeople OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24761)
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
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 227
-- Name: contactpeople_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contactpeople_id_seq OWNED BY public.contactpeople.id;


--
-- TOC entry 230 (class 1259 OID 24782)
-- Name: forgetpasswordhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forgetpasswordhistory (
    creationtime timestamp with time zone,
    code text,
    mail text,
    id integer
);


ALTER TABLE public.forgetpasswordhistory OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24714)
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
-- TOC entry 226 (class 1259 OID 24754)
-- Name: news_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news_category (
    name text,
    id integer NOT NULL
);


ALTER TABLE public.news_category OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24775)
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
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 229
-- Name: news_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_category_id_seq OWNED BY public.news_category.id;


--
-- TOC entry 228 (class 1259 OID 24768)
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
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 228
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- TOC entry 232 (class 1259 OID 24788)
-- Name: priorities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.priorities (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.priorities OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24787)
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
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 231
-- Name: priorities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.priorities_id_seq OWNED BY public.priorities.id;


--
-- TOC entry 218 (class 1259 OID 24641)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name text NOT NULL,
    key text
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24646)
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
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 219
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- TOC entry 224 (class 1259 OID 24708)
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
-- TOC entry 234 (class 1259 OID 24797)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    updated_by integer NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24796)
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
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 233
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- TOC entry 220 (class 1259 OID 24647)
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
-- TOC entry 221 (class 1259 OID 24652)
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
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 221
-- Name: todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.todo_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 222 (class 1259 OID 24653)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    email text NOT NULL,
    key text,
    refresh_token text
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- TOC entry 3240 (class 2604 OID 24826)
-- Name: about_us id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.about_us ALTER COLUMN id SET DEFAULT nextval('public.about_us_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 24664)
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 24665)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 24762)
-- Name: contactpeople id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactpeople ALTER COLUMN id SET DEFAULT nextval('public.contactpeople_id_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 24769)
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 24776)
-- Name: news_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_category ALTER COLUMN id SET DEFAULT nextval('public.news_category_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 24791)
-- Name: priorities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.priorities ALTER COLUMN id SET DEFAULT nextval('public.priorities_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 24666)
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 24800)
-- Name: status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 24667)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);


--
-- TOC entry 3242 (class 2606 OID 24670)
-- Name: accounts accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- TOC entry 3244 (class 2606 OID 24672)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 24674)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 24795)
-- Name: priorities priorities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.priorities
    ADD CONSTRAINT priorities_pkey PRIMARY KEY (id);


--
-- TOC entry 3248 (class 2606 OID 24676)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 24804)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 24678)
-- Name: tasks todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 24680)
-- Name: tokens tokens_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_email_key UNIQUE (email);


--
-- TOC entry 3254 (class 2606 OID 24682)
-- Name: tokens tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_token_key UNIQUE (key);


--
-- TOC entry 3264 (class 2606 OID 24815)
-- Name: status account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT account_id_fkey FOREIGN KEY (updated_by) REFERENCES public.accounts(id) NOT VALID;


--
-- TOC entry 3259 (class 2606 OID 24743)
-- Name: tasks assignee_acc_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT assignee_acc_fkey FOREIGN KEY (assignee_acc_id) REFERENCES public.accounts(id) NOT VALID;


--
-- TOC entry 3260 (class 2606 OID 24805)
-- Name: tasks priority_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT priority_fkey FOREIGN KEY (priority_id) REFERENCES public.priorities(id) NOT VALID;


--
-- TOC entry 3261 (class 2606 OID 24748)
-- Name: tasks project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT project_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) NOT VALID;


--
-- TOC entry 3262 (class 2606 OID 24810)
-- Name: tasks status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT status_fkey FOREIGN KEY (status_id) REFERENCES public.status(id) NOT VALID;


--
-- TOC entry 3263 (class 2606 OID 24687)
-- Name: tokens tokens_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_email_fkey FOREIGN KEY (email) REFERENCES public.accounts(email);


-- Completed on 2023-08-11 14:57:16

--
-- PostgreSQL database dump complete
--

