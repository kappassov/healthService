--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

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
-- Name: country; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.country (
    cname character varying(50) NOT NULL,
    population bigint NOT NULL
);


ALTER TABLE public.country OWNER TO madara;

--
-- Name: discover; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.discover (
    cname character varying(50) NOT NULL,
    disease_code character varying(50) NOT NULL,
    first_enc_date date NOT NULL
);


ALTER TABLE public.discover OWNER TO madara;

--
-- Name: disease; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.disease (
    id integer NOT NULL,
    disease_code character varying(50) NOT NULL,
    pathogen character varying(20) NOT NULL,
    description character varying(140) NOT NULL
);


ALTER TABLE public.disease OWNER TO madara;

--
-- Name: diseasetype; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.diseasetype (
    id integer NOT NULL,
    description character varying(140) NOT NULL
);


ALTER TABLE public.diseasetype OWNER TO madara;

--
-- Name: doctor; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.doctor (
    email character varying(60) NOT NULL,
    degree character varying(20) NOT NULL
);


ALTER TABLE public.doctor OWNER TO madara;

--
-- Name: publicservant; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.publicservant (
    email character varying(60) NOT NULL,
    department character varying(50) NOT NULL
);


ALTER TABLE public.publicservant OWNER TO madara;

--
-- Name: record; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.record (
    email character varying(60) NOT NULL,
    cname character varying(50) NOT NULL,
    disease_code character varying(50) NOT NULL,
    total_deaths integer NOT NULL,
    total_patients integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.record OWNER TO madara;

--
-- Name: record_id_seq; Type: SEQUENCE; Schema: public; Owner: madara
--

CREATE SEQUENCE public.record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.record_id_seq OWNER TO madara;

--
-- Name: record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: madara
--

ALTER SEQUENCE public.record_id_seq OWNED BY public.record.id;


--
-- Name: specialize; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.specialize (
    id integer NOT NULL,
    email character varying(60) NOT NULL,
    index integer NOT NULL
);


ALTER TABLE public.specialize OWNER TO madara;

--
-- Name: specialize_index_seq; Type: SEQUENCE; Schema: public; Owner: madara
--

CREATE SEQUENCE public.specialize_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.specialize_index_seq OWNER TO madara;

--
-- Name: specialize_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: madara
--

ALTER SEQUENCE public.specialize_index_seq OWNED BY public.specialize.index;


--
-- Name: users; Type: TABLE; Schema: public; Owner: madara
--

CREATE TABLE public.users (
    email character varying(60) NOT NULL,
    name character varying(30) NOT NULL,
    surname character varying(40) NOT NULL,
    salary integer NOT NULL,
    phone character varying(20) NOT NULL,
    cname character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO madara;

--
-- Name: record id; Type: DEFAULT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.record ALTER COLUMN id SET DEFAULT nextval('public.record_id_seq'::regclass);


--
-- Name: specialize index; Type: DEFAULT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.specialize ALTER COLUMN index SET DEFAULT nextval('public.specialize_index_seq'::regclass);


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.country (cname, population) FROM stdin;
Kazakhstan	18000000
Russia	120000000
USA	150000000
China	1400000000
Germany	50000000
Ukraine	40000000
Kosovo	5000000
Italy	25000000
Norway	14000000
Mexico	40000000
\.


--
-- Data for Name: discover; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.discover (cname, disease_code, first_enc_date) FROM stdin;
China	danger	2019-11-03
Italy	biohazard	1765-04-28
Kosovo	rare	1999-12-15
Norway	danger	1901-04-25
China	covid-19	2019-11-05
USA	parcinson	1817-05-25
Germany	depression	1895-08-25
Russia	syphilis	1876-04-12
USA	diphtheria	1985-08-01
Kazakhstan	diphtheria	1976-01-15
\.


--
-- Data for Name: disease; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.disease (id, disease_code, pathogen, description) FROM stdin;
1	danger	virus	causes death
4	rare	fungus	rare countries
1	biohazard	parasite	lethal
1	covid-19	virus	caused by the SARS-CoV-2 virus
5	tuberculesis	virus	lung disease
6	cancer	carcinoma	cell disease
7	trojan	bug	software disease
8	humorist	clown	type of person
9	parcinson	nervous	brain damage
10	depression	vitamins	lack of vitamins
2	diphtheria	bacteria	serious infection
3	syphilis	bacteria	sexually transmitted disease
\.


--
-- Data for Name: diseasetype; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.diseasetype (id, description) FROM stdin;
1	infectious
2	hereditary
3	deficiency
4	physiological
5	virology
6	oncology
7	malware
8	ridiculous
9	tremorus
10	psychological
\.


--
-- Data for Name: doctor; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.doctor (email, degree) FROM stdin;
akerke@email.com	MD
akezhan@email.com	MD
arafat@email.com	PhD
meruyert@email.com	MD
madi@email.com	PhD
dima@email.com	MD
\.


--
-- Data for Name: publicservant; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.publicservant (email, department) FROM stdin;
abay@email.com	Dept1
akylzhan@email.com	Dept2
dilnaz@email.com	Dept2
timur@email.com	Dept3
aruzhan@email.com	Dept1
madina@email.com	Dept3
\.


--
-- Data for Name: record; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.record (email, cname, disease_code, total_deaths, total_patients, id) FROM stdin;
akylzhan@email.com	Germany	covid-19	150000	855000	6
akylzhan@email.com	Russia	tuberculesis	14000	86000	9
aruzhan@email.com	Italy	covid-19	45600	245000	12
madina@email.com	Kazakhstan	tuberculesis	55	1087	14
madina@email.com	USA	parcinson	250000	1350000	16
dilnaz@email.com	Kazakhstan	depression	12000	165000	17
dilnaz@email.com	Germany	cancer	560000	2540000	18
madina@email.com	Italy	covid-19	125545	656584	20
timur@email.com	Italy	tuberculesis	1200	250000	21
dilnaz@email.com	Norway	syphilis	1000	15600	22
abay@email.com	China	covid-19	250000	4500000	4
abay@email.com	Kazakhstan	covid-19	10000	120000	3
timur@email.com	Russia	syphilis	10	1000000	15
timur@email.com	Mexico	covid-19	25000	1012800	8
abay@email.com	Italy	covid-19	12300	2000000	5
timur@email.com	Germany	trojan	100	10000	23
akylzhan@email.com	Ukraine	covid-19	12312	2423423	24
timur@email.com	Germany	tuberculesis	234234	234234	25
\.


--
-- Data for Name: specialize; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.specialize (id, email, index) FROM stdin;
1	arafat@email.com	1
2	meruyert@email.com	2
4	akezhan@email.com	3
1	akerke@email.com	4
3	akerke@email.com	6
4	akerke@email.com	7
2	arafat@email.com	8
3	arafat@email.com	9
5	akerke@email.com	10
5	meruyert@email.com	11
5	akezhan@email.com	12
1	madi@email.com	13
4	dima@email.com	14
2	dima@email.com	15
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: madara
--

COPY public.users (email, name, surname, salary, phone, cname) FROM stdin;
abay@email.com	Abay	Kappassov	120000	87771112233	Kazakhstan
akerke@email.com	Akerke	Tolegen	150000	87776667788	Italy
akezhan@email.com	Akezhan	Rakishev	200000	87777778899	Norway
akylzhan@email.com	Akylzhan	Sauranbay	85000	87773334455	Kosovo
arafat@email.com	Arafat	Bauyrzhanuly	180000	87778889900	Ukraine
aruzhan@email.com	Aruzhan	Aruzhan	230000	87770103445	Mexico
dilnaz@email.com	Dilnaz	Amanzholova	140000	87774445566	USA
dima@email.com	Dima	Ivanov	174000	87071235487	Kosovo
madi@email.com	Madi	Turysbek	100000	87076523252	Italy
madina@email.com	Madina	Smetova	90000	87055623245	Kazakhstan
meruyert@email.com	Meruyert	Karzhaubayeva	230000	87770001122	Norway
timur@email.com	Timur	Rakhishov	195000	87772223344	Russia
\.


--
-- Name: record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: madara
--

SELECT pg_catalog.setval('public.record_id_seq', 25, true);


--
-- Name: specialize_index_seq; Type: SEQUENCE SET; Schema: public; Owner: madara
--

SELECT pg_catalog.setval('public.specialize_index_seq', 15, true);


--
-- Name: discover Discover_pkey; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.discover
    ADD CONSTRAINT "Discover_pkey" PRIMARY KEY (cname, disease_code);


--
-- Name: diseasetype DiseaseType_pkey; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.diseasetype
    ADD CONSTRAINT "DiseaseType_pkey" PRIMARY KEY (id);


--
-- Name: doctor Doctor_pkey; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY (email);


--
-- Name: publicservant PublicServant_pkey; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.publicservant
    ADD CONSTRAINT "PublicServant_pkey" PRIMARY KEY (email);


--
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (email);


--
-- Name: country cname; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT cname PRIMARY KEY (cname);


--
-- Name: disease disease_code; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.disease
    ADD CONSTRAINT disease_code PRIMARY KEY (disease_code);


--
-- Name: record record_pkey; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT record_pkey PRIMARY KEY (email, cname, disease_code, id);


--
-- Name: specialize spec_pkey; Type: CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.specialize
    ADD CONSTRAINT spec_pkey PRIMARY KEY (id, email, index);


--
-- Name: discover cname; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.discover
    ADD CONSTRAINT cname FOREIGN KEY (cname) REFERENCES public.country(cname);


--
-- Name: users cname; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT cname FOREIGN KEY (cname) REFERENCES public.country(cname);


--
-- Name: record cname; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT cname FOREIGN KEY (cname) REFERENCES public.country(cname);


--
-- Name: discover disease_code; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.discover
    ADD CONSTRAINT disease_code FOREIGN KEY (disease_code) REFERENCES public.disease(disease_code) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: record disease_code; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT disease_code FOREIGN KEY (disease_code) REFERENCES public.disease(disease_code) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: publicservant email; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.publicservant
    ADD CONSTRAINT email FOREIGN KEY (email) REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: doctor email; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT email FOREIGN KEY (email) REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: specialize email; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.specialize
    ADD CONSTRAINT email FOREIGN KEY (email) REFERENCES public.doctor(email) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: record email; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT email FOREIGN KEY (email) REFERENCES public.publicservant(email) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: disease id; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.disease
    ADD CONSTRAINT id FOREIGN KEY (id) REFERENCES public.diseasetype(id);


--
-- Name: specialize id; Type: FK CONSTRAINT; Schema: public; Owner: madara
--

ALTER TABLE ONLY public.specialize
    ADD CONSTRAINT id FOREIGN KEY (id) REFERENCES public.diseasetype(id);


--
-- PostgreSQL database dump complete
--

