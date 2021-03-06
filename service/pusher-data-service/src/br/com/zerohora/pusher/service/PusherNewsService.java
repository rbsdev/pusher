package br.com.zerohora.pusher.service;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.com.zerohora.pusher.PusherList;
import br.com.zerohora.pusher.exception.PusherException;
import net.sf.json.JSONArray;
/**
 * Copyright 2014 Zero Hora
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
@Path("news")
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class PusherNewsService {

	@GET
	@Path("list/{team}")
	public JSONArray listByTeam( @PathParam("team") final String team, 
								 @DefaultValue("20") @QueryParam("size") final Integer size, 
								 @DefaultValue("2")  @QueryParam("hl") final Integer hl ) throws PusherException {
		try {
			return new PusherList().listNews(team, hl, size);
		} catch (PusherException e) {
			e.printStackTrace();
			throw e;
		}
	}
}
