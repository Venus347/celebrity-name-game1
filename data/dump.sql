--
-- PostgreSQL database dump
--

\restrict NpLR4YlJVMTqJ3eY4p8DOeCZrjktFrZGZ4cUlPFoqt6DXOzocLRyZ8O5w6fJ93d

-- Dumped from database version 14.23 (Ubuntu 14.23-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.23 (Ubuntu 14.23-0ubuntu0.22.04.1)

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
-- Name: Celebrity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Celebrity" (
    id text NOT NULL,
    name text NOT NULL,
    used boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "gameId" text NOT NULL
);


ALTER TABLE public."Celebrity" OWNER TO postgres;

--
-- Name: Game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Game" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "currentName" text,
    "roomCode" text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Game" OWNER TO postgres;

--
-- Name: Player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Player" (
    id text NOT NULL,
    username text NOT NULL,
    score integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "gameId" text NOT NULL
);


ALTER TABLE public."Player" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Celebrity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Celebrity" (id, name, used, "createdAt", "gameId") FROM stdin;
\.


--
-- Data for Name: Game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Game" (id, "createdAt", "currentName", "roomCode", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Player" (id, username, score, "createdAt", "updatedAt", "gameId") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
fe34f98d-37e3-4227-acab-6daff091cd94	6a24eba9260efce7dc4f6bb820239f9e75087bd5e0ba2da8b85a9e3a98e10d24	2026-07-01 22:28:04.291858-04	20260701174154_tables_games	\N	\N	2026-07-01 22:28:04.280566-04	1
9a18d6ab-b820-4b59-a267-32b0b16754aa	9bdf3e269b8804d5d47865bf780e8feb8ac2a8aa360da71fbbcfd21a57586fcb	2026-07-01 22:31:04.584058-04	20260702023104_init	\N	\N	2026-07-01 22:31:04.551742-04	1
\.


--
-- Name: Celebrity Celebrity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Celebrity"
    ADD CONSTRAINT "Celebrity_pkey" PRIMARY KEY (id);


--
-- Name: Game Game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Game"
    ADD CONSTRAINT "Game_pkey" PRIMARY KEY (id);


--
-- Name: Player Player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Celebrity_gameId_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Celebrity_gameId_name_key" ON public."Celebrity" USING btree ("gameId", name);


--
-- Name: Game_roomCode_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Game_roomCode_key" ON public."Game" USING btree ("roomCode");


--
-- Name: Celebrity Celebrity_gameId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Celebrity"
    ADD CONSTRAINT "Celebrity_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES public."Game"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Player Player_gameId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES public."Game"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict NpLR4YlJVMTqJ3eY4p8DOeCZrjktFrZGZ4cUlPFoqt6DXOzocLRyZ8O5w6fJ93d

