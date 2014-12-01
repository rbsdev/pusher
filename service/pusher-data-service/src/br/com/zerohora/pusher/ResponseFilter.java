package br.com.zerohora.pusher;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

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
 * @author isaias_alves <isaiasa@gmail.com>
 */
@Provider
public class ResponseFilter implements ContainerResponseFilter {

	private Integer maxAge = 120;
	private String allowOrigin = "*";

	@Override
	public ContainerResponse filter(ContainerRequest request, ContainerResponse response) {
		try {
			MultivaluedMap<String, Object> headers = response.getHttpHeaders();
			headers.add("Access-Control-Allow-Origin", allowOrigin); // Allow for any clients
			headers.add("Cache-control", "public, max-age=120");//cache 120 secounds
			final MediaType contentType = response.getMediaType();
			headers.putSingle("Content-Type", contentType.toString() + ";charset=UTF-8");
		} catch (Exception e) {
			throw e;
		}
		return response;
	}

	public Integer getMaxAge() {
		return maxAge;
	}

	public void setMaxAge(Integer maxAge) {
		this.maxAge = maxAge;
	}

	public String getAllowOrigin() {
		return allowOrigin;
	}

	public void setAllowOrigin(String allowOrigin) {
		this.allowOrigin = allowOrigin;
	}
}
